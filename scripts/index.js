const loadLevel = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayLevel(data.data));
};

const loadLesson = (level) => {
  const url = `https://openapi.programming-hero.com/api/level/${level}`;

  fetch(url)
    .then((response) => response.json())
    .then((lessons) => {
      console.log(lessons.data);
      displayLessons(lessons.data);
    });
};
const displayLessons = (lessons) => {
  const LessonsContainer = document.getElementById("LessonsContainer");
  LessonsContainer.innerHTML = "";

  if (lessons.length == 0) {
    LessonsContainer.innerHTML = `         <div class="col-span-full text-center">
    <img src="./assets/alert-error.png" class="mx-auto" />
            <p class="font-bangla text-[#79716B] font-normal text-base]">
             এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h1 class="font-bangla font-medium text-3xl">
              নেক্সট Lesson এ যান
            </h1>
          </div>`;
    return;
  }

  lessons.forEach((lesson) => {
    const newLesson = document.createElement("div");
    newLesson.innerHTML = `
     <div class="max-w-xl text-center bg-[#ffffff] rounded-md p-10 items-center space-y-7 mx-auto">
            <h1 class="text-3xl font-bold">${lesson.word ? "word not found" : lesson.word}</h1>
            <p class="text-[20px] font-medium">Meaning /Pronounciation</p>
            <h1 class="font-bangla text-4xl font-semibold text-[#18181B] opacity-80">
            ${lesson.meaning ? lesson.meaning : "meaning not found"}
            /${lesson.pronunciation ? lesson.pronunciation : "pronunciation not found"}</h1>
            <div class="flex justify-between">
              <button class="btn bg-[#1A91FF1A] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
              <button class="btn bg-[#1A91FF1A] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
     </div>
    `;

    LessonsContainer.append(newLesson);
  });
};
const displayLevel = (levels) => {
  // get the container & empty it
  const levelContainer = document.getElementById("lessons-container");
  levelContainer.innerHTML = "";

  // get into every lessons
  levels.forEach((level) => {
    // create a container or div

    const levelDataContainer = document.createElement("div");
    levelDataContainer.innerHTML = `
    <button onclick="loadLesson(${level.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson -${level.level_no}</button>
    `;

    // append the created div

    levelContainer.appendChild(levelDataContainer);
  });
};

loadLevel();
