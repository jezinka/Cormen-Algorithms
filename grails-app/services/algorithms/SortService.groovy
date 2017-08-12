package algorithms

abstract class SortService {

    ArrayList steps = []

    static SortService createService(String sortAlgorithmName) {
        switch (sortAlgorithmName) {
            case 'bubbleSort':
                return new BubbleSortService()
            case 'quickSort':
                return new QuickSortService()
            case 'selectionSort':
                return new SelectionSortService()
        }
        return new BubbleSortService()
    }

    abstract sort(ArrayList<Integer> array)

    void swapElementsInList(ArrayList<Integer> array, Integer src, Integer dst) {
        array.swap(src, dst)
        steps.add([src, dst])
    }

    int findMinInTable(ArrayList array, int i, int n) {
        array.indexOf(array[i..n - 1].min())
    }
}
