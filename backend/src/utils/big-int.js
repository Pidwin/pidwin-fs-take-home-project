
export default (string) => {
  const bigInt = BigInt;

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#use_within_json
  bigInt.prototype.toJSON = function() {
    return this.toString()
  };

  return bigInt(string);
};
