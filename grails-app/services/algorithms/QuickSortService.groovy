package algorithms

class QuickSortService extends SortService {

    ArrayList sort(ArrayList<Integer> arrayList) {
        quickSort(arrayList, 0, arrayList.size() - 1)
        return steps
    }

    void quickSort(ArrayList array, int p, int r) {
        if (p < r) {
            int q = partition(array, p, r)
            quickSort(array, p, q - 1)
            quickSort(array, q + 1, r)
        }
    }

    int partition(ArrayList<Integer> array, int p, int r) {
        int x = array[r]
        int i = p - 1

        for (int j = p; j <= r - 1; j++) {
            if (array[j] <= x) {
                i += 1
                swapElementsInList(array, i, j)
            }
        }
        swapElementsInList(array, i + 1, r)
        return i + 1
    }
}
