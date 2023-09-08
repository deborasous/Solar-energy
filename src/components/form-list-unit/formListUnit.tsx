interface ListUnitProps {
  handleResgiter: () => void;
}

export default function FormListUnit({ handleResgiter }: ListUnitProps) {
  return (
    <div
      className={`min-h-screen`}
    >
      <div>Lista unidades</div>
      <button onClick={handleResgiter}>Nova unidade</button>
    </div>
  );
}
