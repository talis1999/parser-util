import { get, isPlainObject } from "lodash";
// get(object, path, [defaultValue]) - Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.
// isPlainObject(value) - Checks if value is a plain object, that is, an object created by the Object constructor or one with a [[Prototype]] of null

interface ParseSchema {
  schema: Record<string, Options>;
  arrayLinkKey?: string;
}
type Path = string;
type Options = ParseSchema | Path;

type Data = Record<string, unknown>;

const isPath = (options: Options): options is Path =>
  typeof options === "string";

const isData = (data: unknown): data is Data => isPlainObject(data);

// This util would be capable of molding data object to a new mold -
// ! - Due to current build array link operations (via optional arrayLinkKey) the array items wont have access to data outside their scope
// next step - implement ../
// * implement only value boolean
const dataParser = (data: Data, options: Options): unknown => {
  if (isPath(options)) return get(data, options);

  if (options.arrayLinkKey) {
    const arrayData = get(data, options.arrayLinkKey);
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

const options: Options = {
  schema: {
    items: {
      schema: {
        id: "b",
        unavaliableDataExample: "c",
      },
      arrayLinkKey: "a",
    },
    items2: {
      schema: { id: "b" },
      arrayLinkKey: "a",
    },
    person: {
      schema: {
        name: "c",
        lastName: "d",
      },
    },
  },
};

console.log(
  dataParser(
    { a: [{ b: "2" }, { b: "4", e: 6 }], c: "alex", d: "talisman" },
    options
  )
);