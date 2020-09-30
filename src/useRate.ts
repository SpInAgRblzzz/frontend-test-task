import { Dispatch, useEffect, useState } from "react";
import { interval } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { updateRateAction } from "./store";

const fetchUrl = "https://api.coindesk.com/v1/bpi/currentprice/USD.json";
const poolingInterval = 10000;

export const useRate = (dispatch: Dispatch<{ type: string; payload: string }>) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
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
                dispatch(updateRateAction(`${data.bpi.USD.rate_float}`));
            });
    }, [dispatch]);

    return isLoaded;
};
