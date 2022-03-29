<script>
export default {
  computed: {
    genres() {
      let allGenres = [];
      for (const item of this.game.genres) {
        switch (item) {
          case "shooter":
            allGenres.push("Шутер");
            break;
          case "actionAndAdventure":
            allGenres.push("Экшн и приключения");
            break;
          case "rolePlaying":
            allGenres.push("Ролевые игры");
            break;
          case "racingAndFlying":
            allGenres.push("Гонки и авиасимуляторы");
            break;
          case "strategy":
            allGenres.push("Стратегии");
            break;
          case "classic":
            allGenres.push("Классика");
            break;
          case "sport":
            allGenres.push("Спорт");
            break;
          case "platformer":
            allGenres.push("Аркады");
            break;
          case "puzzleAndTrivia":
            allGenres.push("Головоломки и викторины");
            break;
          case "other":
            allGenres.push("Другие");
            break;
          case "simulation":
            allGenres.push("Симуляторы");
            break;
          case "familyAndKids":
            allGenres.push("Семья и дети");
            break;
          case "fighting":
            allGenres.push("Борьба");
            break;
          case "MOBA":
            allGenres.push("MOBA");
            break;
          case "music":
            allGenres.push("Музыка");
            break;
          default:
            break;
        }
      }
      return allGenres.join(", ");
    },
    features() {
      let allFeatures = [];
      for (const item of this.game.featuresList) {
        switch (item) {
          case "singlePlayer":
            allFeatures.push("Один игрок");
            break;
          case "ultraHd":
            allFeatures.push("4K Ultra HD");
            break;
          case "localCoop":
            allFeatures.push("Локальная кооперативная игра в Xbox");
            break;
          case "onlineCoop":
            allFeatures.push("Совместная игра по сети");
            break;
          case "onlineMP":
            allFeatures.push("Многопользовательская игра по сети");
            break;
          case "localMP":
            allFeatures.push("Локальная многопользовательская игра в Xbox");
            break;
          case "opitmizedXSeries":
            allFeatures.push("Оптимизировано для Xbox Series X|S");
            break;
          case "xoxEnhanced":
            allFeatures.push("Игры для Xbox One X с улучшениями");
            break;
          case "fps60":
            allFeatures.push("60 FPS");
            break;
          case "fps120":
            allFeatures.push("120 FPS");
            break;
          default:
            break;
        }
      }
      return allFeatures.join(", ");
    },
    localization() {
      let allLocalizations = [];
      for (const item of this.game.ruLocalization) {
        switch (item) {
          case "interface":
            allLocalizations.push("ИНТЕРФЕЙС");
            break;
          case "subtitles":
            allLocalizations.push("СУБТИТРЫ");
            break;
          case "audio":
            allLocalizations.push("АУДИО");
            break;
          default:
            break;
        }
      }
      return allLocalizations.join(", ");
    },
    OCSticker() {
      switch (this.game.OCRating) {
        case "Mighty Man":
          return require("@/assets/mighty-man.avif");
        case "Strong Man":
          return require("@/assets/strong-man.avif");
        case "Fair Man":
          return require("@/assets/fair-man.avif");
        case "Weak Man":
          return require("@/assets/weak-man.avif");
        default:
          return false;
      }
    },
  },
};
</script>
