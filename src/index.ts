import { get, isPlainObject } from "lodash";
// get(object, path, [defaultValue]) - Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.
// isPlainObject(value) - Checks if value is a plain object, that is, an object created by the Object constructor or one with a [[Prototype]] of null

interface ParseSchema {
  schema: Schema;
  arrayRef?: string;
}
type Path = string;
type Options = ParseSchema | Path;
type Schema = Record<string, Options>;

type Data = Record<string, unknown>;

// Basic type validators
const isPath = (options: Options): options is Path =>
  typeof options === "string";
const isData = (data: unknown): data is Data => isPlainObject(data);

const createSchema = (
  schema: Schema,
  arrayRef: ParseSchema["arrayRef"] | null = null
): ParseSchema => {
  const newSchema: ParseSchema = { schema };
  if (arrayRef) newSchema.arrayRef = arrayRef;
  return newSchema;
};

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

const personSchema = createSchema({
  name: "c",
  lastName: "d",
});

const arrItemSchema = createSchema(
  {
    itemName: "i",
  },
  "inner"
);

const itemSchema = createSchema(
  {
    id: "b",
    unavaliableDataExample: "../c",
    arr: arrItemSchema,
  },
  "a"
);

const mainSchema = createSchema({
  person: personSchema,
  items: itemSchema,
});

const example = dataParser(
  {
    a: [
      { b: "2", inner: [{ i: 1 }] },
      { b: "4", e: 6 },
    ],
    c: "alex",
    d: "talisman",
  },
  mainSchema
);

console.log(example);
// console.log(get(example, "items[0].arr"));
