import { useState } from "react";
import { interval } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { updateRateAction, store } from "./store";

const fetchUrl = "https://api.coindesk.com/v1/bpi/currentprice/USD.json";
const poolingInterval = 10000;

export const useRate = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    interval(poolingInterval)
        .pipe(
            mergeMap(() =>
                fetch(fetchUrl).then((data) => {
                    setIsLoaded(true);
                    return data.json();
                }),
            ),
        )
        .subscribe((data) => {
            store.dispatch(updateRateAction(`${data.bpi.USD.rate_float}`));
        });

    return isLoaded;
};
