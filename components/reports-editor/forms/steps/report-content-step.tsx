import { UseFormReturn } from "react-hook-form"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PlusCircle,
  ImageIcon,
  Pencil,
  Target,
  RotateCcw,
  Check,
  X,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Link as LinkIcon,
  Eye,
  FileEdit,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Stage, Layer, Image as KonvaImage, Circle, Transformer } from "react-konva"
import useImage from "use-image"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Markdown } from "@/components/ui/markdown"
import Image from "next/image"

interface AnnotationPoint {
  x: number
  y: number
  text: string
  id: string
  color: string
}

interface TreatmentZone {
  x: number
  y: number
  radius: number
  id: string
  description: string
  intensity: "light" | "medium" | "intense"
}

interface ImageAnnotation {
  imageUrl: string
  points: AnnotationPoint[]
  zones: TreatmentZone[]
}

interface ReportContentStepProps {
  form: UseFormReturn<any>
}

const AnnotationImage = ({ imageUrl, annotations, onUpdate }: any) => {
  const [image] = useImage(imageUrl)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [points, setPoints] = useState<AnnotationPoint[]>(annotations.points || [])
  const [zones, setZones] = useState<TreatmentZone[]>(annotations.zones || [])
  const [mode, setMode] = useState<"point" | "zone" | "select">("select")
  const transformerRef = useRef<any>(null)
  const stageRef = useRef<any>(null)

  useEffect(() => {
    if (transformerRef.current) {
      const nodes = transformerRef.current.nodes()
      if (nodes.length === 0 && selectedId) {
        const zone = zones.find((z) => z.id === selectedId)
        if (zone) {
          transformerRef.current.nodes([stageRef.current.findOne(`#${selectedId}`)])
          transformerRef.current.getLayer().batchDraw()
        }
      }
    }
  }, [selectedId, zones])

  const handleStageClick = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage()
    if (clickedOnEmpty) {
      setSelectedId(null)
      return
    }

    const pos = e.target.getStage().getPointerPosition()
    if (mode === "point") {
      const newPoint: AnnotationPoint = {
        x: pos.x,
        y: pos.y,
        text: "",
        id: `point-${Date.now()}`,
        color: "#FF5733",
      }
      setPoints([...points, newPoint])
      setSelectedId(newPoint.id)
    } else if (mode === "zone") {
      const newZone: TreatmentZone = {
        x: pos.x,
        y: pos.y,
        radius: 30,
        id: `zone-${Date.now()}`,
        description: "",
        intensity: "medium",
      }
      setZones([...zones, newZone])
      setSelectedId(newZone.id)
    }
  }

  const handleZoneTransform = (e: any) => {
    const node = e.target
    const zoneId = node.id()
    const newZones = zones.map((z) => {
      if (z.id === zoneId) {
        return {
          ...z,
          x: node.x(),
          y: node.y(),
          radius: node.radius() * node.scaleX(),
        }
      }
      return z
    })
    setZones(newZones)
    onUpdate({ points, zones: newZones })
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 mb-4">
        <Button
          variant={mode === "select" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("select")}
        >
          <Pencil className="w-4 h-4 mr-2" />
          Sélectionner
        </Button>
        <Button
          variant={mode === "point" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("point")}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Point d&apos;annotation
        </Button>
        <Button
          variant={mode === "zone" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("zone")}
        >
          <Target className="w-4 h-4 mr-2" />
          Zone de traitement
        </Button>
      </div>

      <Stage
        width={800}
        height={600}
        ref={stageRef}
        onClick={handleStageClick}
        className="border rounded-lg"
      >
        <Layer>
          {image && (
            <KonvaImage
              image={image}
              width={800}
              height={600}
              className="object-contain"
            />
          )}

          {points.map((point) => (
            <Circle
              key={point.id}
              id={point.id}
              x={point.x}
              y={point.y}
              radius={6}
              fill={point.color}
              onClick={() => setSelectedId(point.id)}
            />
          ))}

          {zones.map((zone) => (
            <Circle
              key={zone.id}
              id={zone.id}
              x={zone.x}
              y={zone.y}
              radius={zone.radius}
              fill={
                zone.intensity === "light"
                  ? "rgba(255, 87, 51, 0.2)"
                  : zone.intensity === "medium"
                    ? "rgba(255, 87, 51, 0.4)"
                    : "rgba(255, 87, 51, 0.6)"
              }
              stroke="#FF5733"
              strokeWidth={2}
              draggable
              onClick={() => setSelectedId(zone.id)}
              onDragEnd={handleZoneTransform}
              onTransformEnd={handleZoneTransform}
            />
          ))}

          <Transformer
            ref={transformerRef}
            boundBoxFunc={(oldBox, newBox) => {
              // Limite la déformation pour garder le cercle rond
              newBox.width = newBox.height
              return newBox
            }}
          />
        </Layer>
      </Stage>

      {selectedId && (
        <Card className="p-4 mt-4">
          {selectedId.startsWith("point") && (
            <div className="space-y-4">
              <FormField
                name={`annotation-${selectedId}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annotation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez ce point..."
                        value={points.find((p) => p.id === selectedId)?.text || ""}
                        onChange={(e) => {
                          const newPoints = points.map((p) =>
                            p.id === selectedId ? { ...p, text: e.target.value } : p
                          )
                          setPoints(newPoints)
                          onUpdate({ points: newPoints, zones })
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}

          {selectedId.startsWith("zone") && (
            <div className="space-y-4">
              <FormField
                name={`zone-${selectedId}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description de la zone</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez le traitement effectué..."
                        value={zones.find((z) => z.id === selectedId)?.description || ""}
                        onChange={(e) => {
                          const newZones = zones.map((z) =>
                            z.id === selectedId
                              ? { ...z, description: e.target.value }
                              : z
                          )
                          setZones(newZones)
                          onUpdate({ points, zones: newZones })
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Intensité du traitement</FormLabel>
                <div className="flex space-x-2 mt-2">
                  {["light", "medium", "intense"].map((intensity) => (
                    <Button
                      key={intensity}
                      variant={
                        zones.find((z) => z.id === selectedId)?.intensity ===
                          intensity
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => {
                        const newZones = zones.map((z) =>
                          z.id === selectedId
                            ? { ...z, intensity: intensity as any }
                            : z
                        )
                        setZones(newZones)
                        onUpdate({ points, zones: newZones })
                      }}
                    >
                      {intensity === "light"
                        ? "Légère"
                        : intensity === "medium"
                          ? "Moyenne"
                          : "Intense"}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                if (selectedId.startsWith("point")) {
                  const newPoints = points.filter((p) => p.id !== selectedId)
                  setPoints(newPoints)
                  onUpdate({ points: newPoints, zones })
                } else {
                  const newZones = zones.filter((z) => z.id !== selectedId)
                  setZones(newZones)
                  onUpdate({ points, zones: newZones })
                }
                setSelectedId(null)
              }}
            >
              <X className="w-4 h-4 mr-2" />
              Supprimer
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

export function ReportContentStep({ form }: ReportContentStepProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write")
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [annotations, setAnnotations] = useState<Record<string, ImageAnnotation>>({})

  const handleAnnotationUpdate = (imageUrl: string, updates: any) => {
    const newAnnotations = {
      ...annotations,
      [imageUrl]: {
        imageUrl,
        ...updates,
      },
    }
    setAnnotations(newAnnotations)
    form.setValue("annotations", newAnnotations)
  }

  const insertMarkdown = (tag: string) => {
    const textarea = document.querySelector('textarea[name="description"]') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value

    const markdownTags: Record<string, (selected: string) => string> = {
      bold: (s) => `**${s}**`,
      italic: (s) => `*${s}*`,
      h2: (s) => `## ${s}`,
      list: (s) => `\n- ${s}`,
      orderedList: (s) => `\n1. ${s}`,
      link: (s) => `[${s}](url)`,
      image: (s) => `![${s}](url)`,
    }

    const selected = text.slice(start, end)
    const replacement = markdownTags[tag](selected)

    const newText = text.slice(0, start) + replacement + text.slice(end)
    form.setValue("description", newText)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Description détaillée</FormLabel>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertMarkdown("bold")}
                  >
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertMarkdown("italic")}
                  >
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertMarkdown("h2")}
                  >
                    <Heading2 className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertMarkdown("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertMarkdown("orderedList")}
                  >
                    <ListOrdered className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertMarkdown("link")}
                  >
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertMarkdown("image")}
                  >
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                </div>
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "write" | "preview")} className="w-full">
                  <TabsList className="mb-2">
                    <TabsTrigger value="write" className="flex items-center gap-2">
                      <FileEdit className="w-4 h-4" />
                      Écrire
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Aperçu
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="write">
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez en détail le service effectué..."
                        className="min-h-[300px] font-mono"
                        {...field}
                      />
                    </FormControl>
                  </TabsContent>
                  <TabsContent value="preview">
                    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                      <Markdown>{field.value || "*Aucun contenu à afficher*"}</Markdown>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <FormField
              control={form.control}
              name="observations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Observations</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Notez vos observations particulières..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <Card className="p-6">
            <FormField
              control={form.control}
              name="recommendations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Recommandations</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ajoutez vos recommandations..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
        </div>
      </div>

      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="annotations">Annotations</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="space-y-6">
          {form.watch("photos")?.length > 0 ? (
            <div className="grid grid-cols-4 gap-4 mb-6">
              {form.watch("photos").map((photo: File, index: number) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all ${activeImage === URL.createObjectURL(photo)
                    ? "ring-2 ring-primary"
                    : ""
                    }`}
                  onClick={() => setActiveImage(URL.createObjectURL(photo))}
                >
                  <div className="relative aspect-square">
                    <Image
                      width={100}
                      height={100}
                      src={URL.createObjectURL(photo)}
                      alt={`Photo ${index + 1}`}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Ajoutez des photos dans l&apos;étape &quot;Pièces jointes&quot; pour pouvoir les annoter
              </p>
            </div>
          )}

          {activeImage && (
            <AnnotationImage
              imageUrl={activeImage}
              annotations={annotations[activeImage] || { points: [], zones: [] }}
              onUpdate={(updates: any) => handleAnnotationUpdate(activeImage, updates)}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
} 