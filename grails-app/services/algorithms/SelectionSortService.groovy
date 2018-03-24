package algorithms

class SelectionSortService extends SortService implements SortInterface {

    ArrayList sort(ArrayList array) {

        int lowest

        for (int i = 0; i < array.size() - 1; i++) {
            lowest = UtilsService.findMinInTable(array, i, array.size())
            UtilsService.swapElementsInList(steps, array, i, lowest)
        }

        return steps
    }
}
