package com.asseria.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class DataUtils {
    public DataUtils() {
    }

    public Pageable getPageAble(ListRequest request) {
        String sortingDirection = request.getSortDirection() == null ?
                Sort.Direction.ASC.name() : request.getSortDirection();
        Pageable pageable = PageRequest.of(request.getPageNumber(), request.getRecordPerPage(),
                sortingDirection.equalsIgnoreCase(Sort.Direction.ASC.name())
                        ? Sort.by(request.getSortField()).ascending()
                        : Sort.by(request.getSortField()).descending());
        return pageable;
    }
}
