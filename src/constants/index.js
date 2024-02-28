export const QUIZ_ROUND_TYPES = [
    {
        round_type: "choice",
        name: "Классический Расклад",
        count: 1

    },
    {
        round_type: "combination",
        name: "Комбинация",
        count: 2

    },
    {
        round_type: "spades_queen",
        name: "Пиковая Дама",
        count: 3

    },
    {
        round_type: "joker_secret",
        name: "Тайник JOKERA",
        count: 4

    },
    {
        round_type: "solitaire",
        name: "Пасьянс",
        count: 5

    },
    {
        round_type: "joker",
        name: "JOKER",
        count: 6

    },
    {
        round_type: "royal_flash",
        name: "Флеш - рояль",
        count: 7

    },
    {
        round_type: "all_in",
        name: "ВА-БАНК",
        count: 8

    }
]

export const QUESTION_DEFAULT_IMAGE_URL = "/images/default/no-image.jpg"

export const QUESTION_TYPES = [
    {
        name: "Открытый вопрос",
        technical_name: "open"
    },
    {
        name: "С вариантами ответа",
        technical_name: "with_answers"  
    }
]

export const DEFAULT_QUESTION_TYPE = {
    name: "С вариантами ответа",
    technical_name: "with_answers"
}

export const QUESTION_TIME_LIMITS = {
    5: "5 секунд",
    10: "10 секунд",
    15: "15 секунд",
    30: "30 секунд",
    10: "60 секунд",
}

export const DEFAULT_QUESTION_TIME = {
    time: 30
}