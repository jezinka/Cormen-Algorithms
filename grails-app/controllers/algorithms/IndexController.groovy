package algorithms

class IndexController {

    def index() {
        render(view: "index")
    }

    def sort() {

        def numbers = params.numbers.split(',').collect { Integer.parseInt(it) }

        SelectionSortService sortService = new SelectionSortService()
        ArrayList steps = sortService.sort(numbers.clone())
        render contentType: "text/json", text: steps.toString()
    }
}
