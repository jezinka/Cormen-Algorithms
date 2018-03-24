package algorithms

class UtilsService {

    static void swapElementsInList(ArrayList<Integer> steps, ArrayList<Integer> array, Integer src, Integer dst) {
        if (src != dst) {
            array.swap(src, dst)
            steps.add([src, dst, 'swap', array.clone()])
        }
    }

    static int findMinInTable(ArrayList array, int i, int n) {
        int lowest = i

        for (int j = (i + 1); j < n; j++) {
            if (array[j] < array[lowest]) {
                lowest = j
            }
        }

        lowest
    }
}
