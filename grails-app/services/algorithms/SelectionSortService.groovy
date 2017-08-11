package algorithms

class SelectionSortService extends SortService {

    ArrayList sort(ArrayList array) {

        int lowest

        for (int i = 0; i < array.size() - 1; i++) {
            lowest = findMinInTable(array, i, array.size())
            swapElementsInList(array, i, lowest)
        }

        return steps
    }
}
