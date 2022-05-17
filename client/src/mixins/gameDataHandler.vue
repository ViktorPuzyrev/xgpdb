<script>
/**
 * Миксин для формирования данных о игре для других компонентов.
 * @vue-computed {String} genres - Жанры игры
 * @vue-computed {String} features - Функции игры
 * @vue-computed {String} localization - Локализация игры
 * @vue-computed {String} OCSticker - URL иконки рейтинга OC
 * @vue-computed {String} achievements - Данные о ачивментах игры
 * @vue-computed {String} HLTB - Данные о времени прохождения игры
 */

export default {
  computed: {
    genres() {
      const genres = {
        shooter: "Шутер",
        actionAndAdventure: "Экшн и приключения",
        rolePlaying: "Ролевые игры",
        racingAndFlying: "Гонки и авиасимуляторы",
        strategy: "Стратегии",
        classic: "Классика",
        sport: "Спорт",
        platformer: "Аркады",
        puzzleAndTrivia: "Головоломки и викторины",
        other: "Другие",
        simulation: "Симуляторы",
        familyAndKids: "Семья и дети",
        fighting: "Семья и дети",
        MOBA: "MOBA",
        music: "Музыка",
      };
      return this.getAllOptionsToStr(this.game.genres, genres);
    },
    features() {
      const features = {
        singlePlayer: "Один игрок",
        ultraHd: "4K Ultra HD",
        localCoop: "Локальная кооперативная игра в Xbox",
        onlineCoop: "Совместная игра по сети",
        onlineMP: "Многопользовательская игра по сети",
        localMP: "Локальная многопользовательская игра в Xbox",
        opitmizedXSeries: "Оптимизировано для Xbox Series X|S",
        xoxEnhanced: "Игры для Xbox One X с улучшениями",
        fps60: "60 FPS",
        fps120: "120 FPS",
      };
      return this.game.featuresList.length
        ? this.getAllOptionsToStr(this.game.featuresList, features)
        : "отсутствуют данные";
    },
    localization() {
      const localization = {
        interface: "Интерфейс",
        subtitles: "Субтитры",
        audio: "Аудио",
      };
      return this.game.ruLocalization.length
        ? this.getAllOptionsToStr(this.game.ruLocalization, localization)
        : "отсутствуют данные";
    },
    OCSticker() {
      const stickerPng = {
        MightyMan: require("@/assets/mighty-man.png"),
        StrongMan: require("@/assets/strong-man.png"),
        FairMan: require("@/assets/fair-man.png"),
        WeakMan: require("@/assets/weak-man.png"),
      };
      return this.game.OCRating
        ? stickerPng[this.game.OCRating.replace(/\s/g, "")]
        : false;
    },
    achievements() {
      return !this.game.strategeHard || !this.game.strategeTime
        ? "отсутствуют данные"
        : `сложность ${this.game.strategeHard} из 10, время ${this.game.strategeTime} часов`;
    },
    HLTB() {
      const HLTB = {
        HLTBMainStory: `сюжет ${this.game.HLTBMainStory} ч.`,
        HLTBMainExtras: `сюжет+экстра ${this.game.HLTBMainExtras} ч.`,
        HLTBCompletionist: `перфекционист ${this.game.HLTBCompletionist} ч.`,
        HLTBSinglePlayer: `соло ${this.game.HLTBSinglePlayer} ч.`,
        HLTBCoOp: `кооп ${this.game.HLTBCoOp} ч.`,
        HLTBVs: `версус ${this.game.HLTBVs} ч.`,
      };
      const arrWithOptions = Object.keys(this.game).filter((item) =>
        Object.keys(HLTB).includes(item)
      );
      return arrWithOptions.length
        ? this.getAllOptionsToStr(arrWithOptions, HLTB)
        : "отсутствуют данные";
    },
  },
  methods: {
    /**
     * Заменяет элементы массива на значения ключей объекта и объединяет в строку
     * @param {Array} arr
     * @param {Object} obj
     * @returns {String}
     */
    getAllOptionsToStr(arr, obj) {
      return arr.reduce((sum, option) => {
        return sum.length !== 0 ? `${sum}, ${obj[option]}` : obj[option];
      }, "");
    },
  },
};
</script>
