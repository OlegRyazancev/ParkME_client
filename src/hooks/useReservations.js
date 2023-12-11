import {useMemo} from "react";

export const useReservations = (reservations, sort) => {
    return useMemo(() => {
        if (sort) {
            return [...reservations].sort((a, b) => {
                const statusOrder = {
                    'PLANNED': 1,
                    'ACTIVE': 2,
                    'COMPLETED': 3,
                    'CANCELED': 4
                };

                const statusA = a[sort];
                const statusB = b[sort];

                return statusOrder[statusA] - statusOrder[statusB];
            });
        }
        return reservations;
    }, [sort, reservations]);
}