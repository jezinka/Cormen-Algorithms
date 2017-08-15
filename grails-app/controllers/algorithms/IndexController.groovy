package algorithms

import groovy.json.JsonOutput

class IndexController {

    def index() {
        render(view: "index")
    }

    def sort() {

        def numbers = params.numbers.split(',').collect { Integer.parseInt(it) }

        SortService sortService = SortService.createService(params.algorithmName)
        sortService.sort(numbers.clone())

        render contentType: "application/json", text: JsonOutput.toJson(sortService.steps)
    }
}
