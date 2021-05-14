class Anime {
  constructor(public readonly name: string, public episodes: number) {}
}

const AOT = new Anime("Season1", 12);

//now when name is readonly you cant update it
// AOT.name = "season2";  this gives error
AOT.episodes = 10;

// Singleton class
class AnimeList {
  private animesss: Anime[] = [];

  // public series: AnimeList = new  AnimeList();

  static series: AnimeList = new AnimeList();

  private constructor() {}

  static addAnime(anime: Anime) {
    // because its static no onw outside can extend it
    //    this.animes.push(anime);// after static this wont work only in public it may work
    AnimeList.series.animesss.push(anime);
  }

  getAnime() {
    return this.animesss;
  }
}
AnimeList.addAnime(AOT);
console.log(AnimeList.series.getAnime());
AnimeList.series; //you can only access the instance of series of animelist if its access modifier is static and not public
// AnimeList.series.addAnime(AOT);// if addAnime is a public function this will work
// sigleton class access error
// const al = new AnimeList();// when constructor is private cant make anotherobject of the class
