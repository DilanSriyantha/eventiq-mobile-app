import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useReducer } from "react";
import { DateHandle, DateProps } from "../types";
import { TextInput } from "react-native-paper";
import moment from "moment";
import { DatePickerModal } from "react-native-paper-dates";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";
import reducer, { initialState } from "./reducer";
import { hideCalendar, setDate, showCalendar } from "./actions";

const DateInput = forwardRef<DateHandle, DateProps>((props, ref) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const dateStr = useMemo(() => moment(state.date).format("YYYY-MM-DD"), [state.date]);

    useImperativeHandle(ref, () => ({
        setDate: handleSetDate,
        getDate: handleGetDate,
        clear: handleClear
    }));

    useEffect(() => {
        if (!props.date) return;

        dispatch(setDate(new Date(props.date)));
    }, [props.date]);

    const handleSetDate = useCallback((date: Date) => {
        dispatch(setDate(date));
    }, []);

    const handleGetDate = useCallback(() => {
        return state.date;
    }, [state.date]);

    const handleClear = useCallback(() => {
        dispatch(setDate(new Date()));
    }, []);

    const handleCalendarPress = useCallback(() => {
        dispatch(showCalendar());
    }, []);

    const handleDismiss = useCallback(() => {
        dispatch(hideCalendar());
    }, []);

    const handleDateChange = useCallback((params: { date: CalendarDate; }): void => {
        if (!params.date) return;

        const date: Date = new Date(params.date.getTime());

        props.onDateChange?.apply(null, [date]);

        dispatch(setDate(date));
    }, []);

    return (
        <>
            <TextInput
                mode="outlined"
                editable={false}
                value={dateStr}
                right={
                    <TextInput.Icon
                        icon={"calendar"}
                        onPress={handleCalendarPress}
                    />
                }
            />
            <DatePickerModal
                locale="en"
                mode="single"
                label="Select date"
                visible={state.visible}
                date={state.date}
                onDismiss={handleDismiss}
                onConfirm={handleDateChange}
            />
        </>
    );
});

export default memo(DateInput);