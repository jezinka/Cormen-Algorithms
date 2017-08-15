package algorithms

class InsertionSortService extends SortService {

    def sort(ArrayList<Integer> arrayList) {

        for (int i = 1; i < arrayList.size(); i++) {
            int key = arrayList[i]
            int j = i - 1

            while (j >= 0 && arrayList[j] > key) {
                arrayList[j + 1] = arrayList[j]
                j--
            }
            arrayList[j + 1] = key
            if (i != j + 1) {
                steps.add([i, j + 1, 'shift', arrayList.clone()])
            }
        }

        return arrayList
    }
}
