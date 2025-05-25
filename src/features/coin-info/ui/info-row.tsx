export const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-muted-foreground">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);
