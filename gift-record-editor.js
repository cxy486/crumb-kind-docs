const form = document.querySelector("#gift-form");
const output = document.querySelector("#output");
let record = "";
form.addEventListener("input", () => {
  output.hidden = true;
  record = "";
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const f = new FormData(form);
  const pieces = Number(f.get("pieces")),
    min = Number(f.get("people_min")),
    max = Number(f.get("people_max"));
  const valid =
    [pieces, min, max].every(
      (n) => Number.isSafeInteger(n) && n >= 0 && n <= 1000,
    ) &&
    ((min === 0 && max === 0) || (min > 0 && max >= min));
  const status = document.querySelector("#validation");
  if (!valid) {
    status.textContent =
      "Use whole, non-negative numbers. Enter zero for both sharing fields, or a maximum at least as large as the positive minimum.";
    return;
  }
  status.textContent = "";
  const data = {
    pieces,
    people_min: min,
    people_max: max,
    contents: f.get("contents").trim(),
    packaging: f.get("packaging").trim(),
    dimensions: f.get("dimensions").trim(),
    occasions: f.getAll("occasions"),
  };
  record = JSON.stringify(data, null, 2);
  document.querySelector("#record").textContent = record;
  output.hidden = false;
  document.querySelector("#record").focus();
});
document.querySelector("#copy").addEventListener("click", async () => {
  if (!record) return;
  const status = document.querySelector("#copy-status");
  try {
    await navigator.clipboard.writeText(record);
    status.textContent =
      "Copied. Paste it into the variant’s Shared gift information field.";
  } catch {
    status.textContent =
      "Select the record above and copy it, or download the JSON file.";
  }
});
document.querySelector("#download").addEventListener("click", () => {
  if (!record) return;
  const url = URL.createObjectURL(
    new Blob([record + "\n"], { type: "application/json" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "gift-information.json";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
