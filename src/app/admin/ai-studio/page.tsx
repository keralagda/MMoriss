'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Sparkles, FileText, Image, Copy, Check, Download, 
  Send, RefreshCw, PenTool, Compass, Utensils, Mail
} from 'lucide-react'

type Tab = 'text' | 'image'

interface Template {
  name: string
  icon: React.ElementType
  systemInstruction: string
  promptPlaceholder: string
}

const templates: Record<string, Template> = {
  room: {
    name: 'Room/Villa Listing',
    icon: PenTool,
    systemInstruction: 'You are an expert copywriter for Munroe Morris Service Villa. Write an engaging, luxury-oriented description for a resort room/villa. Highlight premium amenities, backwater views, comfort, and private spaces. Use elegant and sensory language.',
    promptPlaceholder: 'Describe a Premium Lakeview Suite with private veranda and traditional wooden interiors...'
  },
  experience: {
    name: 'Experience Highlight',
    icon: Compass,
    systemInstruction: 'You are an expert copywriter for Munroe Morris Service Villa. Write an inviting, culturally immersive description for a resort excursion or experience. Emphasize heritage, backwater vistas, and authentic local memories.',
    promptPlaceholder: 'Describe a Traditional Kathakali Performance or a Sunset Canoe Excursion through narrow canals...'
  },
  dining: {
    name: 'Dining Venue copy',
    icon: Utensils,
    systemInstruction: 'You are an expert copywriter for Munroe Morris Service Villa. Write an appetizing, fine-dining-oriented description for a resort dish, venue, or menu option. Focus on spices, organic local farm-to-table ingredients, and backwater dining experiences.',
    promptPlaceholder: 'Describe an open-air clay oven seafood dining experience overlooking the lake...'
  },
  email: {
    name: 'Marketing Email',
    icon: Mail,
    systemInstruction: 'You are an expert copywriter for Munroe Morris Service Villa. Write a warm, engaging newsletter or welcome email for guests. Capture the tranquil backwater aesthetic and outline why they should book their holiday here.',
    promptPlaceholder: 'Write a Monsoon special retreat discount campaign email for repeat guests...'
  }
}

export default function AIStudioPage() {
  const [activeTab, setActiveTab] = useState<Tab>('text')
  
  // Text generation states
  const [textPrompt, setTextPrompt] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<string>('room')
  const [tone, setTone] = useState('luxury')
  const [textLoading, setTextLoading] = useState(false)
  const [generatedText, setGeneratedText] = useState('')
  const [copied, setCopied] = useState(false)
  const [textError, setTextError] = useState<string | null>(null)

  // Image generation states
  const [imagePrompt, setImagePrompt] = useState('')
  const [imageLoading, setImageLoading] = useState(false)
  const [generatedImageUrl, setGeneratedImageUrl] = useState('')
  const [imageError, setImageError] = useState<string | null>(null)

  const handleTextGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!textPrompt.trim()) return

    setTextLoading(true)
    setGeneratedText('')
    setTextError(null)

    try {
      const templateInfo = templates[selectedTemplate]
      const fullSystemInstruction = `${templateInfo.systemInstruction} Tone of voice should be: ${tone}.`
      
      const res = await fetch('/api/admin/ai-studio/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textPrompt,
          systemInstruction: fullSystemInstruction
        })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to generate copy')

      setGeneratedText(data.text)
    } catch (err: any) {
      setTextError(err.message)
    } finally {
      setTextLoading(false)
    }
  }

  const handleImageGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imagePrompt.trim()) return

    setImageLoading(true)
    setGeneratedImageUrl('')
    setImageError(null)

    try {
      const res = await fetch('/api/admin/ai-studio/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: imagePrompt })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to generate image')

      setGeneratedImageUrl(data.imageUrl)
    } catch (err: any) {
      setImageError(err.message)
    } finally {
      setImageLoading(false)
    }
  }

  const handleCopyToClipboard = () => {
    if (!generatedText) return
    navigator.clipboard.writeText(generatedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadImage = () => {
    if (!generatedImageUrl) return
    const link = document.createElement('a')
    link.href = generatedImageUrl
    link.download = `ai-generated-resort-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-serif text-3xl text-foreground flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" /> AI Content Studio
        </h1>
        <p className="text-muted-foreground mt-1">
          Generate professional copy and premium images for your website, listings, and promotions using Mistral AI and NVIDIA NIM.
        </p>
      </div>

      {/* Tab Controls */}
      <div className="flex p-1.5 skeuo-inset rounded-2xl bg-[#E6EAF0] max-w-sm">
        {(['text', 'image'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === tab
                ? 'bg-[#F0F2F5] text-primary shadow-[2px_2px_8px_rgba(0,0,0,0.08),-2px_-2px_8px_rgba(255,255,255,0.9)] border-t border-white'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab === 'text' ? (
              <>
                <FileText className="h-4 w-4" />
                Copywriting Studio
              </>
            ) : (
              <>
                <Image className="h-4 w-4" />
                Creative Image Studio
              </>
            )}
          </button>
        ))}
      </div>

      {/* Workspace Grid */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left Hand side: Parameters & Input */}
        <div className="skeuo-card p-6 bg-[#F0F2F5] border border-white/60 space-y-6">
          {activeTab === 'text' ? (
            <form onSubmit={handleTextGenerate} className="space-y-5">
              <h2 className="font-serif text-xl text-foreground font-semibold flex items-center gap-1.5">
                <FileText className="h-5 w-5 text-primary" /> Generate Professional Copy
              </h2>

              {/* Templates Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Select Template</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(templates).map(([key, template]) => {
                    const TemplateIcon = template.icon
                    const isSelected = selectedTemplate === key
                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => setSelectedTemplate(key)}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-medium transition-all text-left ${
                          isSelected
                            ? 'bg-primary/10 text-primary border-primary/20 shadow-sm'
                            : 'bg-white/40 border-black/5 hover:bg-white/70 text-muted-foreground'
                        }`}
                      >
                        <TemplateIcon className="h-4 w-4 shrink-0" />
                        {template.name}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Tone Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Brand Tone</label>
                <div className="flex gap-2 p-1.5 skeuo-inset rounded-xl bg-[#E6EAF0]">
                  {['luxury', 'warm', 'informative', 'playful'].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTone(t)}
                      className={`flex-1 py-1.5 text-xs font-medium rounded-lg capitalize transition-all ${
                        tone === t
                          ? 'bg-[#F0F2F5] text-primary shadow-sm border-t border-white'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Write your prompt</label>
                <textarea
                  rows={4}
                  value={textPrompt}
                  onChange={(e) => setTextPrompt(e.target.value)}
                  placeholder={templates[selectedTemplate].promptPlaceholder}
                  className="skeuo-input p-4 w-full text-xs resize-none"
                  required
                />
              </div>

              {textError && (
                <div className="text-xs text-red-500 bg-red-500/5 p-3 rounded-xl border border-red-500/10">
                  {textError}
                </div>
              )}

              <Button
                type="submit"
                disabled={textLoading}
                className="w-full skeuo-button py-5 text-xs font-semibold flex items-center justify-center gap-2"
              >
                {textLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating Copy via Mistral...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Generate Copy
                  </>
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleImageGenerate} className="space-y-5">
              <h2 className="font-serif text-xl text-foreground font-semibold flex items-center gap-1.5">
                <Image className="h-5 w-5 text-primary" /> Create Visual Artwork
              </h2>

              {/* Quick Prompt Presets */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Presets / Design Ideas</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Luxury backwater villa veranda at golden hour, realistic photography',
                    'Traditional Kerala clay pot fish curry, professional food styling, close-up',
                    'Sunset canoe ride through coconut tree lanes, cinematic aerial perspective',
                    'Traditional Kerala Kathakali performer face makeup, ultra detail, studio lighting'
                  ].map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => setImagePrompt(preset)}
                      className="text-[10px] px-2.5 py-1.5 bg-white/40 border border-black/5 rounded-lg hover:bg-white/80 transition-all text-muted-foreground text-left max-w-full truncate"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Prompt Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Image Prompt</label>
                <textarea
                  rows={4}
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="Describe the image you want to generate (e.g. 'A premium bedroom with large glass windows overlooking backwaters, morning sunshine, realistic')..."
                  className="skeuo-input p-4 w-full text-xs resize-none"
                  required
                />
              </div>

              {imageError && (
                <div className="text-xs text-red-500 bg-red-500/5 p-3 rounded-xl border border-red-500/10">
                  {imageError}
                </div>
              )}

              <Button
                type="submit"
                disabled={imageLoading}
                className="w-full skeuo-button py-5 text-xs font-semibold flex items-center justify-center gap-2"
              >
                {imageLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating via NVIDIA Stable Diffusion...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Create Art
                  </>
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Right Hand side: Generation Output */}
        <div className="skeuo-card p-6 bg-[#F0F2F5] border border-white/60 min-h-[400px] flex flex-col">
          <h2 className="font-serif text-xl text-foreground font-semibold mb-4">Studio Output</h2>

          {activeTab === 'text' ? (
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div className="flex-1 p-4 skeuo-inset rounded-xl bg-white/40 overflow-y-auto max-h-[350px] min-h-[200px] text-xs leading-relaxed text-foreground whitespace-pre-line">
                {generatedText ? (
                  generatedText
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground italic text-center py-12">
                    <FileText className="h-10 w-10 text-muted-foreground/40 mb-2" />
                    Generated copy will appear here. Select a template and write a prompt to start.
                  </div>
                )}
              </div>

              {generatedText && (
                <Button
                  onClick={handleCopyToClipboard}
                  variant="outline"
                  className="w-full text-xs py-4 px-4 flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      Copied to Clipboard
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy generated text
                    </>
                  )}
                </Button>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div className="flex-1 p-2 skeuo-inset rounded-xl bg-white/40 flex items-center justify-center min-h-[300px] overflow-hidden relative">
                {generatedImageUrl ? (
                  <img 
                    src={generatedImageUrl} 
                    alt="AI Generated Artwork" 
                    className="w-full h-auto max-h-[320px] rounded-lg object-contain"
                  />
                ) : imageLoading ? (
                  <div className="flex flex-col items-center justify-center text-primary text-center">
                    <RefreshCw className="h-10 w-10 animate-spin mb-2" />
                    <span className="text-xs">Creating image. This may take 10-15 seconds...</span>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground italic text-center py-12">
                    <Image className="h-10 w-10 text-muted-foreground/40 mb-2" />
                    Generated image will appear here. Choose a preset or write a prompt to generate.
                  </div>
                )}
              </div>

              {generatedImageUrl && (
                <Button
                  onClick={handleDownloadImage}
                  className="w-full skeuo-button py-4 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download PNG
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
