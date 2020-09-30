import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { interval } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { updateRateAction } from "./redux/actionCreators";

const fetchUrl = "https://api.coindesk.com/v1/bpi/currentprice/USD.json";
const poolingInterval = 10000;

export const useRate = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

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
