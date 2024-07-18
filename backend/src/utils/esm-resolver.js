const handlerCache = {};

const esmResolver = (handlerPath) => ({
  basePath: handlerPath,
  resolver: async (handlerPath, route, apiDoc) => {
    if (!handlerPath || typeof handlerPath !== 'string' || !handlerPath.length) {
      throw Error(`handlerPath must be a lengthy string (${typeof handlerPath} given)`);
    }

    const { basePath, expressRoute, openApiRoute, method } = route;
    const pathKey = openApiRoute.substring(basePath.length);
    const schema = apiDoc.paths[pathKey][method.toLowerCase()];
    const id = schema['x-eov-operation-id'] || schema['operationId'];
    const handler = schema['x-eov-operation-handler'];

    if (!id || typeof id !== 'string' || !id.length) {
      throw Error(`x-eov-operation-id for ${expressRoute} (${method}) must be a lengthy string (${typeof id} given)`);
    }
    if (!handler || typeof handler !== 'string' || !handler.length) {
      throw Error(`x-eov-operation-handler for ${expressRoute} (${method}) must be a lengthy string (${typeof handler} given)`);
    }

    const cacheKey = `${expressRoute}-${method}-${handler}`;
    if (!handlerCache[cacheKey]) {
      const module = `file://${handlerPath}/${handler}.js`;
      const { [id]: fn } = await import(module);
      handlerCache[cacheKey] = fn;
    }

    return async (req, res, next) => {
      try {
        await handlerCache[cacheKey](req, res);
      } catch (error) {
        console.log({ error });
        next(new Error(`Router error: ${handler}.${id}`));
      }
    };
  }
})

export default esmResolver;
