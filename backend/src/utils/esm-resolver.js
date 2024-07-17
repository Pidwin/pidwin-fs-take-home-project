const esmResolver = (basePath) => ({
  basePath,
  resolver: (basePath, route, apiDoc) => {
    const pathKey = route.openApiRoute.substring(route.basePath.length);
    const schema = apiDoc.paths[pathKey][route.method.toLowerCase()];
    const id = schema['x-eov-operation-id'] || schema['operationId'];
    const handler = schema['x-eov-operation-handler'];
    const module = `file://${basePath}/${handler}.js`;
    return async (req, res, next) => {
      try {
        const { default: fn } = await import(module);
        fn(req, res);
      } catch (error) {
        console.log(error);
        next(new Error(`Router error: ${handler}.${id}`));
      }
    }
  }
})

export default esmResolver;
