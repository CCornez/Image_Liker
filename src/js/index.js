import "../css/style.scss";
import { httpClient } from "./helpers";

const input = document.querySelector(".search form input");
const form = document.querySelector(".search form");
const sectionTemplate = document.querySelector(".sectionTemplate").innerHTML;
const main = document.querySelector("main");

form.onsubmit = function (e) {
  e.preventDefault();
  const { value } = input;
  if (value.length > 3) {
    httpClient(`/search/photos?query=${input.value}`).then((response) => {
      main.innerHTML = response.data.results
        .map((obj) => {
          let description = obj.description;
          const alt_description = obj.alt_description;
          if ((obj.description = "null")) {
            description = alt_description;
          }
          return sectionTemplate
            .replace("#SECTION_IMAGE_URL", obj.urls.small)
            .replace("#SECTION_TEXT", description)
            .replace("#SECTION_IMAGE_ALT", alt_description);
        })
        .join("");
    });
  }
  input.value = "";
};
