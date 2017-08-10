package algorithms

class BubbleSortService {

    def sort(ArrayList<Integer> array) {

        ArrayList steps = []

        int n = array.size()
        for (int i = 0; i <= n - 1; i++) {
            for (int j = n - 1; j >= (i + 1); j--) {
                if (array[j] < array[j - 1]) {
                    steps.add(switchItemsInTable(array, j, j - 1))
                }
            }
        }

        return steps
    }

    static ArrayList switchItemsInTable(ArrayList<Integer> array, Integer src, Integer dst) {
        int tmp = array[src]
        array[src] = array[dst]
        array[dst] = tmp
        return [src, dst]
    }
}
