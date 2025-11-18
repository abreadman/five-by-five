import React, { useState, useEffect } from "react";

// Example category tags (extend as needed)
const categories = [
  "Bone",
  "Muscle",
  "Nerve",
  "Blood Vessel",
  "Ligament",
  "Joint",
  "Other"
];

// Placeholder items; replace with full JSON fetch or embed
const items = [
  { "name": "EOP", "type": "Bone" },
  { "name": "Superior nuchal line", "type": "Bone" },
  { "name": "External occipital crest", "type": "Bone" },
  { "name": "Mastoid process", "type": "Bone" },
  { "name": "Mandible", "type": "Bone" },
  { "name": "Hyoid bone", "type": "Bone" },
  { "name": "Iliac crest", "type": "Bone" },
  { "name": "ASIS", "type": "Bone" },
  { "name": "PSIS", "type": "Bone" },
  { "name": "Sacrum", "type": "Bone" },
  { "name": "Coccyx", "type": "Bone" },
  { "name": "Pubic crest", "type": "Bone" },
  { "name": "Pubic tubercle", "type": "Bone" },
  { "name": "Greater trochanter", "type": "Bone" },
  { "name": "Ischial tuberosity", "type": "Bone" },
  { "name": "Talus", "type": "Bone" },
  { "name": "Calcaneus", "type": "Bone" },
  { "name": "Navicular", "type": "Bone" },
  { "name": "Cuboid", "type": "Bone" },
  { "name": "Cuneiforms", "type": "Bone" },

  // hand
  { "name": "Scaphoid", "type": "Bone" },
  { "name": "Lunate", "type": "Bone" },
  { "name": "Triquetrum", "type": "Bone" },
  { "name": "Pisiform", "type": "Bone" },
  { "name": "Hamate", "type": "Bone" },
  { "name": "Capitate", "type": "Bone" },
  { "name": "Trapezium", "type": "Bone" },
  { "name": "Trapezoid", "type": "Bone" },

  //neck 
  { "name": "SCM", "type": "Muscle" },
  { "name": "Trapezius (upper fibers)", "type": "Muscle" },
  { "name": "Temporalis", "type": "Muscle" },
  { "name": "Masseter", "type": "Muscle" },
  { "name": "Levator scapulae", "type": "Muscle" },
  { "name": "Splenius capitis", "type": "Muscle" },
  { "name": "Scalenes (anterior, middle, posterior)", "type": "Muscle" },
  { "name": "Latissimus dorsi", "type": "Muscle" },
  { "name": "Rhomboid major", "type": "Muscle" },
  { "name": "Rhomboid minor", "type": "Muscle" },
  { "name": "Gluteus maximus", "type": "Muscle" },
  { "name": "Gluteus medius", "type": "Muscle" },
  { "name": "Tensor fascia latae (TFL)", "type": "Muscle" },
  { "name": "Piriformis", "type": "Muscle" },
  { "name": "Quadratus femoris", "type": "Muscle" },
  { "name": "Iliopsoas", "type": "Muscle" },
  { "name": "Sartorius", "type": "Muscle" },
  { "name": "Rectus femoris)", "type": "Muscle" },
  { "name": "Vastus medialis", "type": "Muscle" },
  { "name": "Vastus lateralis", "type": "Muscle" },
  { "name": "Pectineus", "type": "Muscle" },
  { "name": "Adductor longus", "type": "Muscle" },
  { "name": "Adductor magnus", "type": "Muscle" },
  { "name": "Gracilis", "type": "Muscle" },
  { "name": "Semitendinosus", "type": "Muscle" },
  { "name": "Semimembranosus", "type": "Muscle" },
  { "name": "Biceps femoris", "type": "Muscle" },
  { "name": "Gastrocnemius", "type": "Muscle" },
  { "name": "Soleus", "type": "Muscle" },
  { "name": "Plantaris", "type": "Muscle" },
  { "name": "Popliteus", "type": "Muscle" },
  { "name": "Tibialis posterior", "type": "Muscle" },
  { "name": "Flexor digitorum longus", "type": "Muscle" },
  { "name": "Flexor hallucis longus", "type": "Muscle" },
  { "name": "Tibialis anterior", "type": "Muscle" },
  { "name": "Extensor hallucis longus", "type": "Muscle" },
  { "name": "Extensor digitorum longus", "type": "Muscle" },
  { "name": "Peroneus longus", "type": "Muscle" },
  { "name": "Peroneus brevis", "type": "Muscle" },
  { "name": "Extensor digitorum brevis", "type": "Muscle" },
  { "name": "Extensor hallucis brevis", "type": "Muscle" },
  { "name": "Deltoid", "type": "Muscle" },
  { "name": "Pectoralis major", "type": "Muscle" },
  { "name": "Pectoralis minor", "type": "Muscle" },
  { "name": "Teres major", "type": "Muscle" },
  { "name": "Serratus anterior", "type": "Muscle" },
  { "name": "Supraspinatus", "type": "Muscle" },
  { "name": "Infraspinatus", "type": "Muscle" },
  { "name": "Teres minor", "type": "Muscle" },
  { "name": "Subscapularis", "type": "Muscle" },
  { "name": "Biceps brachii", "type": "Muscle" },
  { "name": "Brachialis", "type": "Muscle" },
  { "name": "Coracobrachialis", "type": "Muscle" },
  { "name": "Triceps brachii", "type": "Muscle" },
  { "name": "Anconeus", "type": "Muscle" },
  { "name": "Pronator teres", "type": "Muscle" },
  { "name": "Flexor carpi radialis", "type": "Muscle" },
  { "name": "Palmaris longus", "type": "Muscle" },
  { "name": "Flexor carpi ulnaris", "type": "Muscle" },
  { "name": "Flexor digitorum superficialis", "type": "Muscle" },
  { "name": "Flexor pollicis longus", "type": "Muscle" },
  { "name": "Flexor digitorum profundus", "type": "Muscle" },
  { "name": "Pronator quadratus", "type": "Muscle" },
  { "name": "Brachioradialis", "type": "Muscle" },
  { "name": "Extensor carpi radialis longus", "type": "Muscle" },
  { "name": "Extensor carpi radialis brevis", "type": "Muscle" },
  { "name": "Extensor digitorum", "type": "Muscle" },
  { "name": "Extensor digiti minimi", "type": "Muscle" },
  { "name": "Extensor carpi ulnaris", "type": "Muscle" },
  { "name": "Supinator", "type": "Muscle" },
  { "name": "Abductor pollicis longus", "type": "Muscle" },
  { "name": "Extensor pollicis longus", "type": "Muscle" },
  { "name": "Extensor pollicis brevis", "type": "Muscle" },
  { "name": "Extensor indicis", "type": "Muscle" },
  { "name": "Abductor pollicis brevis", "type": "Muscle" },
  { "name": "Flexor pollicis brevis", "type": "Muscle" }]
;

export default function SurfaceAnatomyApp() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [count, setCount] = useState(5);
  const [results, setResults] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const generate = () => {
    const filtered = selectedCategories.length
      ? items.filter((item) => selectedCategories.includes(item.type))
      : items;

    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setResults(shuffled.slice(0, count));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Surface Anatomy Drill Generator</h1>

      {/* <div className="space-y-2">
        <h2 className="text-lg font-semibold">Select Categories</h2>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`p-2 rounded-xl border shadow-sm transition-all ${
                selectedCategories.includes(cat)
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div> */}

      <div>
        <h2 className="text-lg font-semibold mb-1">Number of Random Items</h2>
        <input
          type="number"
          min="1"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="p-2 border rounded-xl w-full"
        />
      </div>

      <button
        className="w-full p-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700"
        onClick={generate}
      >
        Generate
      </button>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Results</h2>
        {results.length === 0 && <p className="text-gray-500">No results yet.</p>}
        {results.map((item, idx) => (
          <div key={idx} className="p-3 rounded-xl border shadow-sm bg-white">
            <strong>{item.name}</strong>
            {/* <p className="text-sm text-gray-600">Type: {item.type}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
