package algorithms

import groovy.json.JsonOutput

class IndexController {

    def index() {
        render(view: "index")
    }

    def sort() {

        def numbers = params.numbers.split(',').collect { Integer.parseInt(it) }

        SortInterface sortService = createService(params.algorithmName)
        sortService.sort(numbers.clone())

        render contentType: "application/json", text: JsonOutput.toJson(sortService.steps)
    }

    private SortInterface createService(String sortAlgorithmName) {
        switch (sortAlgorithmName) {
            case 'bubbleSort':
                return new BubbleSortService()
            case 'quickSort':
                return new QuickSortService()
            case 'selectionSort':
                return new SelectionSortService()
            case 'insertionSort':
                return new InsertionSortService()
        }
        return new BubbleSortService()
    }
}
