'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  BedDouble,
  Users,
  IndianRupee,
  Image,
  ToggleLeft,
  ToggleRight,
  X,
  Check,
  GripVertical
} from 'lucide-react'

interface Room {
  id: string
  name: string
  slug: string
  description: string
  price: number
  size: string
  maxGuests: number
  beds: string
  view: string
  features: string[]
  amenities: string[]
  images: string[]
  active: boolean
  sortOrder: number
}

// Mock data
const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Backwater Villa',
    slug: 'backwater-villa',
    description: 'Traditional Kerala architecture with modern amenities overlooking the serene backwaters',
    price: 15000,
    size: '120 m²',
    maxGuests: 2,
    beds: '1 King Bed',
    view: 'Backwater View',
    features: ['Private Deck', 'Canoe Ride', 'Sunset View', 'Outdoor Bath'],
    amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'In-room Safe', 'Smart TV', 'Tea Maker'],
    images: ['/images/villa-1.png'],
    active: true,
    sortOrder: 1
  },
  {
    id: '2',
    name: 'Coconut Grove Suite',
    slug: 'coconut-grove-suite',
    description: 'Nestled among swaying coconut palms with authentic Kerala decor',
    price: 12000,
    size: '95 m²',
    maxGuests: 2,
    beds: '1 King Bed',
    view: 'Garden View',
    features: ['Garden View', 'Outdoor Bath', 'Bird Watching', 'Private Balcony'],
    amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'In-room Safe', 'Smart TV', 'Tea Maker'],
    images: ['/images/villa-2.png'],
    active: true,
    sortOrder: 2
  },
  {
    id: '3',
    name: 'Heritage Nalukettu',
    slug: 'heritage-nalukettu',
    description: 'Traditional Kerala courtyard house with wooden architecture',
    price: 18000,
    size: '150 m²',
    maxGuests: 4,
    beds: '2 Queen Beds',
    view: 'Courtyard View',
    features: ['Courtyard', 'Wood Carvings', 'Heritage Style', 'Rain Shower'],
    amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'In-room Safe', 'Smart TV', 'Tea Maker'],
    images: ['/images/villa-3.png'],
    active: true,
    sortOrder: 3
  },
  {
    id: '4',
    name: 'Luxury Houseboat',
    slug: 'luxury-houseboat',
    description: 'Floating villa on the backwaters with complete privacy',
    price: 35000,
    size: '200 m²',
    maxGuests: 2,
    beds: '1 King Bed',
    view: '360° Backwater View',
    features: ['Private Chef', 'Butler Service', '360° View', 'Sun Deck'],
    amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'In-room Safe', 'Smart TV', 'Private Dining'],
    images: ['/images/experience-1.png'],
    active: true,
    sortOrder: 4
  },
  {
    id: '5',
    name: 'Pool Villa',
    slug: 'pool-villa',
    description: 'Private plunge pool with garden views',
    price: 25000,
    size: '180 m²',
    maxGuests: 2,
    beds: '1 King Bed',
    view: 'Pool & Garden View',
    features: ['Private Pool', 'Garden View', 'Outdoor Shower', 'Sun Deck'],
    amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'In-room Safe', 'Smart TV', 'Tea Maker'],
    images: ['/images/gallery-3.png'],
    active: true,
    sortOrder: 5
  },
  {
    id: '6',
    name: 'Royal Suite',
    slug: 'royal-suite',
    description: 'Ultimate luxury with panoramic backwater views',
    price: 50000,
    size: '250 m²',
    maxGuests: 4,
    beds: '1 King Bed + Living Area',
    view: 'Panoramic Backwater View',
    features: ['Private Pool', 'Butler Service', 'Spa Room', 'Dining Pavilion'],
    amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'In-room Safe', 'Smart TV', 'Private Chef'],
    images: ['/images/gallery-4.png'],
    active: false,
    sortOrder: 6
  }
]

// Room Form Modal
function RoomFormModal({
  room,
  onClose,
  onSave
}: {
  room: Room | null
  onClose: () => void
  onSave: (room: Partial<Room>) => void
}) {
  const [formData, setFormData] = useState<Partial<Room>>(
    room || {
      name: '',
      description: '',
      price: 0,
      size: '',
      maxGuests: 2,
      beds: '',
      view: '',
      features: [],
      amenities: [],
      images: [],
      active: true
    }
  )
  const [featureInput, setFeatureInput] = useState('')
  const [amenityInput, setAmenityInput] = useState('')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach(file => {
        if (file.size > 2 * 1024 * 1024) {
          alert(`File ${file.name} is too large. Max size is 2MB.`)
          return
        }
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64String = reader.result as string
          setFormData(prev => ({
            ...prev,
            images: [...(prev.images || []), base64String]
          }))
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const deleteImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index)
    }))
  }

  const setAsPrimary = (index: number) => {
    setFormData(prev => {
      const images = [...(prev.images || [])]
      if (index > 0 && index < images.length) {
        const [target] = images.splice(index, 1)
        images.unshift(target)
      }
      return { ...prev, images }
    })
  }

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...(prev.features || []), featureInput.trim()]
      }))
      setFeatureInput('')
    }
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index)
    }))
  }

  const addAmenity = () => {
    if (amenityInput.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: [...(prev.amenities || []), amenityInput.trim()]
      }))
      setAmenityInput('')
    }
  }

  const removeAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities?.filter((_, i) => i !== index)
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto skeuo-panel rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 p-6 border-b border-border flex items-center justify-between bg-background z-10">
          <h2 className="font-serif text-2xl text-foreground">
            {room ? 'Edit Room' : 'Add New Room'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Room Name *</label>
              <Input
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Backwater Villa"
                className="skeuo-input"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Price per Night (₹) *</label>
              <Input
                type="number"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                placeholder="15000"
                className="skeuo-input"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Description *</label>
            <Textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the room..."
              className="skeuo-input min-h-[100px]"
            />
          </div>

          {/* Room Details */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Size</label>
              <Input
                value={formData.size || ''}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                placeholder="e.g., 120 m²"
                className="skeuo-input"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Max Guests</label>
              <Input
                type="number"
                value={formData.maxGuests || ''}
                onChange={(e) => setFormData({ ...formData, maxGuests: Number(e.target.value) })}
                placeholder="2"
                className="skeuo-input"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Beds</label>
              <Input
                value={formData.beds || ''}
                onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                placeholder="e.g., 1 King Bed"
                className="skeuo-input"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">View</label>
              <Input
                value={formData.view || ''}
                onChange={(e) => setFormData({ ...formData, view: e.target.value })}
                placeholder="e.g., Backwater View"
                className="skeuo-input"
              />
            </div>
            <div className="flex flex-col justify-end">
              {/* Image Upload Button */}
              <label className="text-sm font-medium text-foreground mb-2 block">Add Images</label>
              <label className="cursor-pointer">
                <span className="inline-flex items-center justify-center w-full px-4 py-3 rounded-xl text-sm font-medium skeuo-button text-primary-foreground">
                  <Image className="h-4 w-4 mr-2" />
                  Upload Images
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          {/* Gallery / Image Manager */}
          <div className="skeuo-inset p-4 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Room Gallery</span>
              <span className="text-xs text-muted-foreground">{(formData.images?.length || 0)} image(s)</span>
            </div>

            {formData.images && formData.images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border group bg-muted/20">
                    <img src={img} alt={`Room image ${idx + 1}`} className="w-full h-full object-cover" />
                    
                    {/* Floating Controls */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10">
                      {idx !== 0 && (
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8 w-8 rounded-full bg-white/95 text-foreground hover:bg-white"
                          title="Set as Primary"
                          onClick={() => setAsPrimary(idx)}
                        >
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-8 w-8 rounded-full"
                        title="Delete Image"
                        onClick={() => deleteImage(idx)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Badges */}
                    {idx === 0 ? (
                      <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[9px] px-2 py-0.5 rounded-full font-medium shadow-md">
                        Primary
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center border-2 border-dashed border-border rounded-xl">
                <p className="text-sm text-muted-foreground">No images uploaded yet. Click upload to add images.</p>
              </div>
            )}
          </div>

          {/* Features */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Features</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Add a feature..."
                className="skeuo-input flex-1"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              />
              <Button onClick={addFeature} variant="outline">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features?.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 skeuo-inset rounded-full text-sm text-muted-foreground"
                >
                  {feature}
                  <button type="button" onClick={() => removeFeature(index)} className="hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Amenities</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                placeholder="Add an amenity..."
                className="skeuo-input flex-1"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
              />
              <Button onClick={addAmenity} variant="outline">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.amenities?.map((amenity, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 skeuo-inset rounded-full text-sm text-muted-foreground"
                >
                  {amenity}
                  <button type="button" onClick={() => removeAmenity(index)} className="hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, active: !formData.active })}
              className={`w-12 h-6 rounded-full transition-colors ${
                formData.active ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                formData.active ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
            <span className="text-sm text-foreground">
              {formData.active ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 p-6 border-t border-border flex items-center justify-end gap-4 bg-background">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="skeuo-button" onClick={() => onSave(formData)}>
            {room ? 'Save Changes' : 'Add Room'}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function RoomsPage() {
  const [mounted, setMounted] = useState(false)
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [showForm, setShowForm] = useState(false)

  const loadRooms = async () => {
    try {
      const res = await fetch('/api/rooms')
      if (res.ok) {
        const data = await res.json()
        setRooms(data)
      }
    } catch (err) {
      console.error('Failed to load rooms:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRooms()
    setMounted(true)
  }, [])

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleRoomStatus = async (room: Room) => {
    try {
      const res = await fetch('/api/rooms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...room, active: !room.active })
      })
      if (res.ok) {
        const updated = await res.json()
        setRooms(rooms.map(r => r.id === room.id ? updated : r))
      }
    } catch (err) {
      console.error('Failed to toggle room status:', err)
    }
  }

  const handleSaveRoom = async (roomData: Partial<Room>) => {
    try {
      const method = selectedRoom ? 'PUT' : 'POST'
      const payload = selectedRoom ? { ...selectedRoom, ...roomData } : roomData
      const res = await fetch('/api/rooms', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        const saved = await res.json()
        if (selectedRoom) {
          setRooms(rooms.map(r => r.id === selectedRoom.id ? saved : r))
        } else {
          setRooms([...rooms, saved])
        }
        setShowForm(false)
        setSelectedRoom(null)
      } else {
        alert('Failed to save room details.')
      }
    } catch (err) {
      console.error('Failed to save room:', err)
      alert('Error saving room.')
    }
  }

  const handleDeleteRoom = async (roomId: string) => {
    if (!confirm('Are you sure you want to delete this room?')) return
    try {
      const res = await fetch(`/api/rooms?id=${roomId}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        setRooms(rooms.filter(r => r.id !== roomId))
      } else {
        alert('Failed to delete room.')
      }
    } catch (err) {
      console.error('Failed to delete room:', err)
    }
  }

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-muted-foreground">Loading rooms...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Rooms & Villas</h1>
          <p className="text-muted-foreground mt-1">Manage accommodations and pricing</p>
        </div>
        <Button
          className="skeuo-button"
          onClick={() => {
            setSelectedRoom(null)
            setShowForm(true)
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Room
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search rooms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 skeuo-inset rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Rooms Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`skeuo-card overflow-hidden flex flex-col justify-between ${!room.active ? 'opacity-60' : ''}`}
          >
            <div>
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={room.images[0] || '/images/placeholder.png'}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-white">{room.name}</h3>
                    <p className="text-white/80 text-sm">{room.size}</p>
                  </div>
                  <button
                    onClick={() => toggleRoomStatus(room)}
                    className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                  >
                    {room.active ? (
                      <ToggleRight className="h-5 w-5 text-primary" />
                    ) : (
                      <ToggleLeft className="h-5 w-5 text-white/70" />
                    )}
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{room.description}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{room.maxGuests}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <BedDouble className="h-4 w-4" />
                    <span>{room.beds}</span>
                  </div>
                  <div className="flex items-center gap-1 text-primary font-medium ml-auto">
                    <IndianRupee className="h-4 w-4" />
                    <span>{room.price.toLocaleString()}/night</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {room.features.slice(0, 3).map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-2 py-1 skeuo-inset text-muted-foreground rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {room.features.length > 3 && (
                    <span className="text-xs px-2 py-1 text-muted-foreground">
                      +{room.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 pt-0">
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 text-primary"
                  onClick={() => {
                    setSelectedRoom(room)
                    setShowForm(true)
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:bg-red-500/10"
                  onClick={() => handleDeleteRoom(room.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Room Form Modal */}
      <AnimatePresence>
        {showForm && (
          <RoomFormModal
            room={selectedRoom}
            onClose={() => {
              setShowForm(false)
              setSelectedRoom(null)
            }}
            onSave={handleSaveRoom}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

