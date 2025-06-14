"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Type,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  ImageIcon,
  LinkIcon,
  AlertTriangle,
  Quote,
  SeparatorVerticalIcon as SeparatorIcon,
  TableIcon,
  SquareCode,
  Video,
  HelpCircle,
  Clock,
  Clipboard,
  DollarSign,
  Building,
  FormInput,
  NotebookTabsIcon as TabsIcon,
  FileText,
  LayoutGrid,
  Award,
  MessageSquare,
  Layers,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  Palette,
  Sparkles,
} from "lucide-react"

export function ComponentSelector({ onSelect }) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("styled")

  const handleSelect = (componentType) => {
    onSelect(componentType)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Sparkles className="mr-2 h-4 w-4" />
          <span>Add Component</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select Component</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="styled" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="styled">
              <Palette className="h-4 w-4 mr-2" />
              Styled Components
            </TabsTrigger>
            <TabsTrigger value="basic">
              <Type className="h-4 w-4 mr-2" />
              Basic Components
            </TabsTrigger>
          </TabsList>

          <TabsContent value="styled" className="mt-4">
            <ScrollArea className="h-[60vh]">
              <div className="grid grid-cols-2 gap-2">
                <ComponentButton
                  icon={<Heading1 className="h-4 w-4" />}
                  label="Heading 1"
                  onClick={() => handleSelect({ type: "heading", level: 1 })}
                />
                <ComponentButton
                  icon={<Heading2 className="h-4 w-4" />}
                  label="Heading 2"
                  onClick={() => handleSelect({ type: "heading", level: 2 })}
                />
                <ComponentButton
                  icon={<Heading3 className="h-4 w-4" />}
                  label="Heading 3"
                  onClick={() => handleSelect({ type: "heading", level: 3 })}
                />
                <ComponentButton
                  icon={<Heading4 className="h-4 w-4" />}
                  label="Heading 4"
                  onClick={() => handleSelect({ type: "heading", level: 4 })}
                />
                <ComponentButton
                  icon={<Heading5 className="h-4 w-4" />}
                  label="Heading 5"
                  onClick={() => handleSelect({ type: "heading", level: 5 })}
                />
                <ComponentButton
                  icon={<Heading6 className="h-4 w-4" />}
                  label="Heading 6"
                  onClick={() => handleSelect({ type: "heading", level: 6 })}
                />
                <ComponentButton
                  icon={<Type className="h-4 w-4" />}
                  label="Paragraph"
                  onClick={() => handleSelect({ type: "paragraph" })}
                />
                <ComponentButton
                  icon={<List className="h-4 w-4" />}
                  label="List"
                  onClick={() => handleSelect({ type: "list" })}
                />
                <ComponentButton
                  icon={<ListOrdered className="h-4 w-4" />}
                  label="Ordered List"
                  onClick={() => handleSelect({ type: "orderedList" })}
                />
                <ComponentButton
                  icon={<ImageIcon className="h-4 w-4" />}
                  label="Image"
                  onClick={() => handleSelect({ type: "image" })}
                />
                <ComponentButton
                  icon={<LinkIcon className="h-4 w-4" />}
                  label="Link"
                  onClick={() => handleSelect({ type: "link" })}
                />
                <ComponentButton
                  icon={<AlertTriangle className="h-4 w-4" />}
                  label="Alert"
                  onClick={() => handleSelect({ type: "alert" })}
                />
                <ComponentButton
                  icon={<Quote className="h-4 w-4" />}
                  label="Quote"
                  onClick={() => handleSelect({ type: "quote" })}
                />
                <ComponentButton
                  icon={<SeparatorIcon className="h-4 w-4" />}
                  label="Separator"
                  onClick={() => handleSelect({ type: "separator" })}
                />
                <ComponentButton
                  icon={<TableIcon className="h-4 w-4" />}
                  label="Table"
                  onClick={() => handleSelect({ type: "table" })}
                />
                <ComponentButton
                  icon={<FileText className="h-4 w-4" />}
                  label="Card"
                  onClick={() => handleSelect({ type: "card" })}
                />
                <ComponentButton
                  icon={<LayoutGrid className="h-4 w-4" />}
                  label="Grid"
                  onClick={() => handleSelect({ type: "grid" })}
                />
                <ComponentButton
                  icon={<Award className="h-4 w-4" />}
                  label="CTA"
                  onClick={() => handleSelect({ type: "cta" })}
                />
                <ComponentButton
                  icon={<HelpCircle className="h-4 w-4" />}
                  label="FAQ"
                  onClick={() => handleSelect({ type: "faq" })}
                />
                <ComponentButton
                  icon={<Clock className="h-4 w-4" />}
                  label="Timeline"
                  onClick={() => handleSelect({ type: "timeline" })}
                />
                <ComponentButton
                  icon={<Clipboard className="h-4 w-4" />}
                  label="Checklist"
                  onClick={() => handleSelect({ type: "checklist" })}
                />
                <ComponentButton
                  icon={<DollarSign className="h-4 w-4" />}
                  label="Pricing"
                  onClick={() => handleSelect({ type: "pricing" })}
                />
                <ComponentButton
                  icon={<Building className="h-4 w-4" />}
                  label="Contact Info"
                  onClick={() => handleSelect({ type: "contact" })}
                />
                <ComponentButton
                  icon={<Video className="h-4 w-4" />}
                  label="Video"
                  onClick={() => handleSelect({ type: "video" })}
                />
                <ComponentButton
                  icon={<SquareCode className="h-4 w-4" />}
                  label="Code Block"
                  onClick={() => handleSelect({ type: "code" })}
                />
                <ComponentButton
                  icon={<MessageSquare className="h-4 w-4" />}
                  label="Comments"
                  onClick={() => handleSelect({ type: "comments" })}
                />
                <ComponentButton
                  icon={<Layers className="h-4 w-4" />}
                  label="Section"
                  onClick={() => handleSelect({ type: "section" })}
                />
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="basic" className="mt-4">
            <ScrollArea className="h-[60vh]">
              <div className="grid grid-cols-2 gap-2">
                <ComponentButton
                  icon={<Heading1 className="h-4 w-4" />}
                  label="Basic Heading 1"
                  onClick={() => handleSelect({ type: "basicHeading", level: 1 })}
                />
                <ComponentButton
                  icon={<Heading2 className="h-4 w-4" />}
                  label="Basic Heading 2"
                  onClick={() => handleSelect({ type: "basicHeading", level: 2 })}
                />
                <ComponentButton
                  icon={<Heading3 className="h-4 w-4" />}
                  label="Basic Heading 3"
                  onClick={() => handleSelect({ type: "basicHeading", level: 3 })}
                />
                <ComponentButton
                  icon={<Heading4 className="h-4 w-4" />}
                  label="Basic Heading 4"
                  onClick={() => handleSelect({ type: "basicHeading", level: 4 })}
                />
                <ComponentButton
                  icon={<Heading5 className="h-4 w-4" />}
                  label="Basic Heading 5"
                  onClick={() => handleSelect({ type: "basicHeading", level: 5 })}
                />
                <ComponentButton
                  icon={<Heading6 className="h-4 w-4" />}
                  label="Basic Heading 6"
                  onClick={() => handleSelect({ type: "basicHeading", level: 6 })}
                />
                <ComponentButton
                  icon={<Type className="h-4 w-4" />}
                  label="Basic Paragraph"
                  onClick={() => handleSelect({ type: "basicParagraph" })}
                />
                <ComponentButton
                  icon={<List className="h-4 w-4" />}
                  label="Basic List"
                  onClick={() => handleSelect({ type: "basicList" })}
                />
                <ComponentButton
                  icon={<ListOrdered className="h-4 w-4" />}
                  label="Basic Ordered List"
                  onClick={() => handleSelect({ type: "basicOrderedList" })}
                />
                <ComponentButton
                  icon={<ImageIcon className="h-4 w-4" />}
                  label="Basic Image"
                  onClick={() => handleSelect({ type: "basicImage" })}
                />
                <ComponentButton
                  icon={<LinkIcon className="h-4 w-4" />}
                  label="Basic Link"
                  onClick={() => handleSelect({ type: "basicLink" })}
                />
                <ComponentButton
                  icon={<AlertTriangle className="h-4 w-4" />}
                  label="Basic Alert"
                  onClick={() => handleSelect({ type: "basicAlert" })}
                />
                <ComponentButton
                  icon={<Quote className="h-4 w-4" />}
                  label="Basic Quote"
                  onClick={() => handleSelect({ type: "basicQuote" })}
                />
                <ComponentButton
                  icon={<SeparatorIcon className="h-4 w-4" />}
                  label="Basic Separator"
                  onClick={() => handleSelect({ type: "basicSeparator" })}
                />
                <ComponentButton
                  icon={<TableIcon className="h-4 w-4" />}
                  label="Basic Table"
                  onClick={() => handleSelect({ type: "basicTable" })}
                />
                <ComponentButton
                  icon={<FileText className="h-4 w-4" />}
                  label="Basic Card"
                  onClick={() => handleSelect({ type: "basicCard" })}
                />
                <ComponentButton
                  icon={<LayoutGrid className="h-4 w-4" />}
                  label="Basic Grid"
                  onClick={() => handleSelect({ type: "basicGrid" })}
                />
                <ComponentButton
                  icon={<HelpCircle className="h-4 w-4" />}
                  label="Basic Accordion"
                  onClick={() => handleSelect({ type: "basicAccordion" })}
                />
                <ComponentButton
                  icon={<Clock className="h-4 w-4" />}
                  label="Basic Timeline"
                  onClick={() => handleSelect({ type: "basicTimeline" })}
                />
                <ComponentButton
                  icon={<FormInput className="h-4 w-4" />}
                  label="Basic Form"
                  onClick={() => handleSelect({ type: "basicForm" })}
                />
                <ComponentButton
                  icon={<TabsIcon className="h-4 w-4" />}
                  label="Basic Tabs"
                  onClick={() => handleSelect({ type: "basicTabs" })}
                />
                <ComponentButton
                  icon={<Video className="h-4 w-4" />}
                  label="Basic Video"
                  onClick={() => handleSelect({ type: "basicVideo" })}
                />
                <ComponentButton
                  icon={<SquareCode className="h-4 w-4" />}
                  label="Basic Code"
                  onClick={() => handleSelect({ type: "basicCode" })}
                />
                <ComponentButton
                  icon={<PanelLeft className="h-4 w-4" />}
                  label="Left Panel"
                  onClick={() => handleSelect({ type: "basicPanel", position: "left" })}
                />
                <ComponentButton
                  icon={<PanelRight className="h-4 w-4" />}
                  label="Right Panel"
                  onClick={() => handleSelect({ type: "basicPanel", position: "right" })}
                />
                <ComponentButton
                  icon={<PanelTop className="h-4 w-4" />}
                  label="Top Panel"
                  onClick={() => handleSelect({ type: "basicPanel", position: "top" })}
                />
                <ComponentButton
                  icon={<PanelBottom className="h-4 w-4" />}
                  label="Bottom Panel"
                  onClick={() => handleSelect({ type: "basicPanel", position: "bottom" })}
                />
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

function ComponentButton({ icon, label, onClick }) {
  return (
    <Button variant="outline" className="h-auto py-3 justify-start" onClick={onClick}>
      <div className="mr-2">{icon}</div>
      <span className="text-sm">{label}</span>
    </Button>
  )
}
