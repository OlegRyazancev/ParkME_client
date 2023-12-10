import {useMemo} from "react";

export const useReservations = (reservations, sort) => {
    return useMemo(() => {
        if (sort) {
            return [...reservations].sort((a, b) => b[sort].localeCompare(a[sort]))
        }
        return reservations;
    }, [sort, reservations]);
}