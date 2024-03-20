import * as PIXI from "libs/pixi.mjs";
import { TickerQueue } from "libs/enums";
import { UPDATE_PRIORITY } from "libs/pixi.mjs";

type QueueProps = CustomQueue | RepeatQueue | DelayQueue | DurationQueue;

type BaseQueue = {
  id?: number;
  dateTime?: number;
  onFunc?: (delta: number) => void | boolean;
  onDone?: () => void;
};

type CustomQueue = {
  type: TickerQueue.CUSTOM;
} & BaseQueue;

type DelayQueue = {
  type: TickerQueue.DELAY;
  delay: number;
} & BaseQueue;

type DurationQueue = {
  type: TickerQueue.DURATION;
  duration?: number;
} & BaseQueue;

type RepeatQueue = {
  type: TickerQueue.REPEAT;
  repeatEvery?: number;
  repeats?: number;
} & BaseQueue;

export const queue = () => {
  let lastId = 0;
  let queueList: (QueueProps | undefined)[] = [];
  let queueIdToDelete = [];

  /**
   * Retrieves the next queue ID.
   *
   * @return {number} The next queue ID.
   */
  const getQueueId = (): number => lastId++;

  const QUEUE_MAP: Record<
    TickerQueue,
    (props: QueueProps, delta: number, index: number) => boolean
  > = {
    [TickerQueue.DELAY]: (
      { dateTime, delay, onFunc, onDone }: DelayQueue,
      delta: number,
    ) => {
      const isDone = Date.now() > dateTime + delay;
      if (isDone && onFunc) onFunc(delta);
      if (isDone && onDone) onDone();
      return isDone;
    },
    [TickerQueue.DURATION]: (
      { dateTime, duration, onFunc, onDone }: DurationQueue,
      delta: number,
    ) => {
      const isDone = Date.now() > dateTime + duration;
      if (!isDone && onFunc) onFunc(delta);
      if (isDone && onDone) onDone();
      return isDone;
    },
    [TickerQueue.REPEAT]: (
      { dateTime, repeatEvery, onFunc, repeats, onDone }: RepeatQueue,
      delta: number,
      index,
    ) => {
      // Repeats are 0 or below
      if (0 > repeats && repeats !== undefined) {
        onDone && onDone();
        return true;
      }
      // It's not yet time to call the func
      if (!(Date.now() > dateTime + repeatEvery)) return false;

      onFunc && onFunc(delta);
      queueList[index].dateTime = Date.now();
      if (repeats !== undefined) queueList[index]["repeats"] = repeats - 1;

      return false;
    },
    [TickerQueue.CUSTOM]: ({ onFunc }, delta) =>
      onFunc && Boolean(onFunc(delta)),
  };

  /**
   * Removes the queue items from `queueList` whose ids are specified in `queueIdToDelete`.
   * Sets the `queueIdToDelete` to an empty array after removing the items.
   *
   * @function removeQueueList
   * @returns {void}
   */
  const removeQueueList = () => {
    queueList = queueList.filter(({ id }) => !queueIdToDelete.includes(id));
    queueIdToDelete = [];
  };
  const load = () => {
    PIXI.Ticker.shared.add(
      ({ deltaTime }) => {
        removeQueueList();
        let index = 0;
        for (const props of queueList) {
          const isReadyToBeDeleted = QUEUE_MAP[props.type](
            props,
            deltaTime,
            index,
          );
          if (isReadyToBeDeleted) queueIdToDelete.push(props.id);

          index++;
        }
      },
      this,
      UPDATE_PRIORITY.HIGH,
    );
  };

  /**
   * Adds a new queue to the queueList with the provided properties.
   *
   * @param {QueueProps} props - The properties of the queue to be added.
   * @returns {number} - The ID of the newly added queue.
   *
   * @example
   * const queueId = add({ name: 'Queue 1', ... });
   */
  const add = (props: QueueProps) => {
    const id = getQueueId();
    queueList.push({ ...props, id, dateTime: props.dateTime || Date.now() });
    return id;
  };

  /**
   * Adds a task to the queue asynchronously.
   *
   * @param {QueueProps} props - The properties of the task to be added.
   * @returns {Promise<number>} - A promise that resolves to the ID of the added task.
   */
  const addAsync = async (props: QueueProps): Promise<number> =>
    new Promise((resolve) => {
      const id = getQueueId();
      props.onDone = () => {
        resolve(1);
      };
      queueList.push({ ...props, id, dateTime: props.dateTime || Date.now() });
      return id;
    });

  /**
   * Removes the specified ID from the queue for deletion.
   *
   * @param {number} id - The ID to be removed from the queue.
   */
  const remove = (id: number) => queueIdToDelete.push(id);

  const addList = (list: QueueProps[], onDone: () => any) => {
    const clonedList = [...list];
    if (clonedList.length === 0) return onDone();

    const object = clonedList.shift();
    add({
      ...object,
      onDone: () => {
        object.onDone && object.onDone();
        addList(clonedList, onDone);
      },
    });
  };

  return {
    load,

    add,
    addAsync,
    remove,

    addList,
  };
};
