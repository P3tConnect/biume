'use client';

import { UseFormReturn } from "react-hook-form"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useRef, useEffect } from "react"
import SignaturePad from "signature_pad"

interface SignatureStepProps {
  form: UseFormReturn<any>
}

export function SignatureStep({ form }: SignatureStepProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const signaturePadRef = useRef<SignaturePad | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current, {
        backgroundColor: "rgb(255, 255, 255)",
      })

      // Restore signature if exists
      const savedSignature = form.getValues("signature")
      if (savedSignature) {
        signaturePadRef.current.fromDataURL(savedSignature)
      }

      // Handle window resize
      const resizeCanvas = () => {
        const canvas = canvasRef.current
        if (canvas) {
          const ratio = Math.max(window.devicePixelRatio || 1, 1)
          canvas.width = canvas.offsetWidth * ratio
          canvas.height = canvas.offsetHeight * ratio
          const context = canvas.getContext("2d")
          if (context) {
            context.scale(ratio, ratio)
          }
        }
      }

      window.addEventListener("resize", resizeCanvas)
      resizeCanvas()

      return () => {
        window.removeEventListener("resize", resizeCanvas)
      }
    }
  }, [form])

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear()
      form.setValue("signature", "")
    }
  }

  const saveSignature = () => {
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      const signatureData = signaturePadRef.current.toDataURL()
      form.setValue("signature", signatureData)
    }
  }

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="signature"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Signature</FormLabel>
            <FormDescription>
              Signez dans la zone ci-dessous pour valider le rapport.
            </FormDescription>
            <FormControl>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 bg-white">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-[200px] border rounded touch-none"
                    onTouchStart={(e) => e.preventDefault()}
                  />
                </div>
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={clearSignature}
                    className="flex-1"
                  >
                    Effacer
                  </Button>
                  <Button
                    type="button"
                    onClick={saveSignature}
                    className="flex-1"
                  >
                    Valider la signature
                  </Button>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
} 