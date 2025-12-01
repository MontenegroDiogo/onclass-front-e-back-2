async function gerarPDF(tipo) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // === Define o título baseado no tipo ===
  const titulo =
    tipo === "confirmada"
      ? "Presença Confirmada"
      : tipo === "naoConfirmada"
      ? "Presença Não Confirmada"
      : "Presença Justificada";

  // === Pega a lista dos alunos (li) ===
  const lista = document.getElementById(tipo).getElementsByTagName("li");

  // === Data e hora atuais ===
  const agora = new Date();
  const dataGeracao = agora.toLocaleDateString("pt-BR");
  const horaGeracao = agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // === Cabeçalho azul arredondado ===
  doc.setFillColor(11, 44, 102); // azul escuro
  doc.roundedRect(10, 10, 190, 15, 5, 5, "F");

  // === Título centralizado ===
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("RELATÓRIO DE PRESENÇA", 105, 20, { align: "center" });

  // === Subtítulo ===
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(titulo, 105, 35, { align: "center" });

  // === Data e hora da geração ===
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Relatório gerado em: ${dataGeracao} às ${horaGeracao}`, 20, 42);

  // === Cabeçalho da tabela ===
  let startY = 55;
  const col1X = 20;
  const col2X = 100;
  const tableWidth = 170;
  const rowHeight = 10;

  doc.setDrawColor(0);
  doc.setLineWidth(0.3);
  doc.rect(col1X, startY, tableWidth, rowHeight); // linha do cabeçalho
  doc.line(col2X, startY, col2X, startY + rowHeight);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("MATRÍCULA", col1X + 5, startY + 7);
  doc.text("NOME", col2X + 5, startY + 7);

  // === Linhas da tabela ===
  doc.setFont("helvetica", "normal");
  let y = startY + rowHeight;

  for (let i = 0; i < lista.length; i++) {
    const texto = lista[i].textContent.trim();
    const [matricula, nome] = texto.split(" - ");

    // desenha retângulo de cada linha
    doc.rect(col1X, y, tableWidth, rowHeight);
    doc.line(col2X, y, col2X, y + rowHeight);

    doc.text(matricula || "", col1X + 5, y + 7);
    doc.text(nome || "", col2X + 5, y + 7);

    y += rowHeight;

    // quebra de página automática se passar o limite
    if (y > 270 && i < lista.length - 1) {
      doc.addPage();
      y = 20;
    }
  }

  // === Linha azul no rodapé ===
  doc.setDrawColor(11, 44, 102);
  doc.setLineWidth(0.8);
  doc.line(10, 285, 200, 285);

  // === Marca de rodapé ===
  doc.setFontSize(9);
  doc.setTextColor(11, 44, 102);
  doc.text("OnClass", 200, 290, { align: "right" });

  // === Salvar arquivo ===
  const nomeArquivo = `Relatorio_${titulo.replace(/\s/g, "_")}_${dataGeracao}.pdf`;
  doc.save(nomeArquivo);
}
