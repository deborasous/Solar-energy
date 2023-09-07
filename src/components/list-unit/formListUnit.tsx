interface ListUnitProps {
  handleResgiter: () => void;
}

export default function FormListUnit({ handleResgiter }: ListUnitProps) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <div>Lista unidades</div>
      <button onClick={handleResgiter}>Nova unidade</button>
    </main>
  );
}
