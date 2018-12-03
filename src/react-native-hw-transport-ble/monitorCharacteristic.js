// @flow
import { Observable } from "rxjs";
import type { Characteristic } from "./types";

export const monitorCharacteristic = (c: Characteristic): Observable<Buffer> =>
  Observable.create(o => {
    const subscription = c.monitor((error, c) => {
      if (error) {
        o.error(error);
        return;
      }
      try {
        const value = Buffer.from(c.value, "base64");
        o.next(value);
      } catch (error) {
        o.error(error);
      }
    });

    return () => subscription.remove();
  });