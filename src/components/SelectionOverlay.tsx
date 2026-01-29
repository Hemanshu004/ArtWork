import { useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

interface Props {
  max: number;
  onSelect: (n: number) => void;
}

export function SelectionOverlay({ max, onSelect }: Props) {
  const op = useRef<OverlayPanel>(null);
  const [val, setVal] = useState<number | null>(null);

  function handleClick() {
    if (!val || val < 1) return;
    
    // clamp to current page
    let n = val;
    if (n > max) n = max;
    
    onSelect(n);
    op.current?.hide();
    setVal(null);
  }

  return (
    <>
      <Button 
        label="Select Rows" 
        icon="pi pi-check-square"
        onClick={e => op.current?.toggle(e)} 
        severity="info"
        outlined
      />
      <OverlayPanel ref={op}>
        <div className="overlay-content">
          <label>How many rows?</label>
          <InputNumber 
            value={val} 
            onValueChange={e => setVal(e.value ?? null)} 
            min={1}
            placeholder="e.g. 5"
            style={{ width: '100%' }}
          />
          <Button label="Select" icon="pi pi-check" onClick={handleClick} style={{ width: '100%' }} />
          <small>Only picks from this page (max {max})</small>
        </div>
      </OverlayPanel>
    </>
  );
}
