import { get } from "lodash";
import { isData, isPath } from "./typeValidators";
// get(object, path, [defaultValue]) - Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.

export interface ParseSchema {
  schema: Schema;
  arrayRef?: string;
}
export type Path = string;
export type Options = ParseSchema | Path;
export type Schema = Record<string, Options>;

export type Data = Record<string, unknown>;

/**
 * Molds data to new data with new format using original data values.
 *
 * @param {Data} data - The original, input data that will be molded.
 * @param {Options} options - The mold, holds either the key path to the "original data" value or a schema that will mold the data at hand.
 * @returns {unknown} Returns the new data object (or array/ value when used recursivly).
 */

const dataParser = (data: Data, options: Options): unknown => {
  if (isPath(options)) return get(data, options);

  if (options.arrayRef) {
    const arrayData = get(data, options.arrayRef);
    if (!Array.isArray(arrayData)) return [];
    return [...arrayData].map((item: unknown) => {
      if (!isData(item)) return item;
      return dataParser(item, { schema: options.schema });
    });
  }

  const objectInstance: Record<string, unknown> = {};
  Object.entries(options.schema).forEach(([new_key, old_key]) => {
    objectInstance[new_key] = dataParser(data, old_key);
  });

  return { ...objectInstance };
};

export default dataParser;
