import {
  enableStickyHeader,
  createExpander,
  createMessageDialog,
  showMessageDialog,
  hideMessageDialog,
  createKeyValueTable,
} from "./kaadu-ui.js";

enableStickyHeader();
createMessageDialog();

const exp1 = createExpander(
  [document.createTextNode("Header")],
  createKeyValueTable({
    label: "value",
    number: 3,
    boolean: true,
    array: [1, 2, 3],
  }),
  "expander-fail",
);

const tst = document.createElement("div");
tst.textContent = "Test";
tst.style.height = "100px";

const exp2 = createExpander(
  [document.createTextNode("Header"), tst],
  document.createTextNode("Content"),
  "expander-fail",
);

const expandersContainer = document.getElementById("expandersContainer");
expandersContainer.appendChild(exp1);
expandersContainer.appendChild(exp2);

document.getElementById("showDialogButton").addEventListener("click", () => {
  showMessageDialog("Hello, this is a message dialog!", "Kaadu UI");
});

const data = [
  { value: 'VEP', label: 'Vembu (Neem)' },
  { value: 'ILAN', label: 'Ilangai (Ceylon Ironwood)' },
  { value: 'POOVARASU', label: 'Poovarasu (Portia Tree)' },
  { value: 'VENGAI', label: 'Vengai (Indian Kino Tree)' },
  { value: 'MAGIZHAM', label: 'Magizham (Spanish Cherry)' },
  { value: 'MARUDHU', label: 'Marudhu (Arjuna Tree)' },
  { value: 'PUNGAM', label: 'Pungam (Indian Beech)' },
  { value: 'KARUVELAM', label: 'Karuvelam (Prosopis Juliflora)' },
  { value: 'THANDRI', label: 'Thandri (Palmyra Palm)' },
  { value: 'ILUPAI', label: 'Ilupai (Mahua Tree)' },
  { value: 'NAA', label: 'Naaval (Jamun)' },
  { value: 'ALA', label: 'Ala (Banyan)' },
  { value: 'ARASU', label: 'Arasu (Peepal)' },
  { value: 'VILVAM', label: 'Vilvam (Bael)' },
];

const cardsGrid = document.getElementById('cardsGrid');
data.forEach(item => {
  const card = document.createElement('div');
  card.className = 'card';
  card.textContent = item.label;
  cardsGrid.appendChild(card);
});
