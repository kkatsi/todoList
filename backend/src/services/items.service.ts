import { TodoItem, Item } from "../interfaces/todo.interface";
import { Items } from "../interfaces/items.interface";

let items: Items = {
  1: {
    id: 1,
    subject: "Create Branch",
    done: true,
  },
  2: {
    id: 2,
    subject: "Make Changes",
    done: false,
  },
  3: {
    id: 3,
    subject: "Push Changes",
    done: false,
  },
};

export const findAll = async (): Promise<Item[]> => Object.values(items);

export const find = async (id: number): Promise<Item> => items[id];

export const create = async (newItem: TodoItem): Promise<Item> => {
  const id = new Date().valueOf();

  items[id] = {
    id,
    ...newItem,
  };

  return items[id];
};

export const update = async (
  id: number,
  itemUpdate: TodoItem
): Promise<Item | null> => {
  const item = await find(id);

  if (!item) {
    return null;
  }

  items[id] = { id, ...itemUpdate };

  return items[id];
};

export const remove = async (id: number): Promise<null | void> => {
  const item = await find(id);

  if (!item) {
    return null;
  }

  delete items[id];
};
