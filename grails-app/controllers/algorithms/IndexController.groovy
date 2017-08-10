package algorithms

class IndexController {

    def index() {
        def numbers = []
        BubbleSortService bubbleSortService = new BubbleSortService()

        Random random = new Random()
        20.times { numbers.add(random.nextInt(100)) }

        ArrayList steps = bubbleSortService.sort(numbers.clone())

        render(view: "index", model: [numbers: numbers, steps: steps])
    }
}
