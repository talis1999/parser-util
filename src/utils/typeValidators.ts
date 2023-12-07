import { isPlainObject } from "lodash";
// isPlainObject(value) - Checks if value is a plain object, that is, an object created by the Object constructor or one with a [[Prototype]] of null
import { Data, Options, Path } from "./dataParser";

// Basic type validators
export const isPath = (options: Options): options is Path =>
  typeof options === "string";
export const isData = (data: unknown): data is Data => isPlainObject(data);
