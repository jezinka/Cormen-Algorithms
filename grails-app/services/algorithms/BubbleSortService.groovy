package algorithms

class BubbleSortService extends SortService implements SortInterface {

    def sort(ArrayList<Integer> array) {

        int n = array.size()
        for (int i = 0; i <= n - 1; i++) {
            for (int j = n - 1; j >= (i + 1); j--) {
                if (array[j] < array[j - 1]) {
                    UtilsService.swapElementsInList(steps, array, j, j - 1)
                }
            }
        }

        return steps
    }
}
