import { X } from "lucide-react";
import { Button } from "./ui/button";

interface ProjectSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSummaryModal({ isOpen, onClose }: ProjectSummaryModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-background rounded-lg shadow-xl overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold">Project Summary</h3>
            <button onClick={onClose} className="p-1 rounded hover:bg-accent">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4 text-sm text-muted-foreground">
            <p>
              This project provides an AI-powered skin analysis pipeline. Users upload a
              facial photo which the backend analyzes using trained models to detect skin
              conditions (acne, wrinkles, dark spots, etc.).
            </p>

            <p>
              The app returns detected issues, tailored product recommendations, and
              actionable tips. Frontend includes upload flow, results UI, and a small
              commerce experience (add-to-cart, cart modal). Backend hosts models and a
              database of recommended products.
            </p>

            <p>
              What to do next: improve model accuracy, add per-item quantities and
              checkout, persist cart, add user accounts, and enhance UX for mobile.
            </p>
          </div>

          <div className="p-6 border-t flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectSummaryModal;
