import {useMemo} from "react";

export const useReservations = (reservations, sort) => {
    return useMemo(() => {
        if (sort === 'status') {
            const statusOrder = {
                'PLANNED': 1,
                'ACTIVE': 2,
                'COMPLETED': 3,
                'CANCELED': 4
            };

            return [...reservations].sort((a, b) => {
                return statusOrder[a.status] - statusOrder[b.status];
            });
        } else if (sort === 'timeFrom') {
            return [...reservations].sort((a, b) => {
                return new Date(b.timeFrom) - new Date(a.timeFrom);
            });
        }

        return reservations;
    }, [sort, reservations]);
}
