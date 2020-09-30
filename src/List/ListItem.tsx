import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Big from "big.js";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    List,
    ListItemText,
    Typography,
} from "@material-ui/core";

import { makeStyles, createStyles } from "@material-ui/core/styles";

import { addServiceMessageAction, deleteMessageAction } from "../redux/actionCreators";

import { rateSelector } from "../redux/selectors";

import { message } from "../Types";

type ListItemProps = {
    message: message;
};

const useStyles = makeStyles(() =>
    createStyles({
        card: { minWidth: "410px", marginBottom: "15px" },
        header: { display: "flex", justifyContent: "space-between" },
    }),
);

export const ListItem = ({ message }: ListItemProps) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const {
        btcAmount,
        text,
        messageType,
        messageContent,
        canDelete,
        isService,
        id,
        serviceAdded,
    } = message;

    const rate = useSelector(rateSelector);

    const handleAddServiceMessage = useCallback(() => {
        dispatch(addServiceMessageAction(id));
    }, [dispatch, id]);

    const handleDelete = useCallback(() => {
        dispatch(deleteMessageAction(id));
    }, [dispatch, id]);

    return (
        <Card className={`${messageType} ${classes.card}`} variant="outlined">
            <CardHeader
                className={classes.header}
                title={text}
                action={
                    canDelete && (
                        <Button variant="outlined" onClick={handleDelete} color="secondary">
                            DELETE
                        </Button>
                    )
                }
                subheader={
                    btcAmount && (
                        <p className="usd-rate">{Big(btcAmount).times(rate).toString()} USD</p>
                    )
                }
            />

            <CardContent>
                {Array.isArray(messageContent) ? (
                    <List>
                        {messageContent.map(({ source, amount }, index) => (
                            <ListItemText
                                key={index}
                                primary={source}
                                secondary={`${Big(amount).times(rate).toString()} USD`}
                            />
                        ))}
                    </List>
                ) : (
                    <Typography>{messageContent}</Typography>
                )}
            </CardContent>

            {!isService && (
                <CardActions>
                    <Button
                        variant="contained"
                        disabled={serviceAdded}
                        onClick={handleAddServiceMessage}
                    >
                        Show secvice message
                    </Button>
                </CardActions>
            )}
        </Card>
    );
};
