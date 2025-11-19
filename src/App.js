import React, { useState, useEffect } from "react";

// Example category tags (extend as needed)
const categories = [
  "Bone",
  "Muscle",
  "Nerve",
  "Blood Vessel",
  "Ligament",
  "Joint",
  "Skull",
  "Face",
  "Pelvis",
  "Shoulder",
  "Knee",
  "Thigh",
  "Ankle",
  "Wrist",
  "Foot",
  "Other"
];

// Placeholder items; replace with full JSON fetch or embed
const items = [

  { "name": "Superior nuchal line", "type": "Bone", "area": "Skull" },
  { "name": "External occipital crest", "type": "Bone", "area": "Skull" },
  { "name": "Mastoid process", "type": "Bone", "area": "Skull" },
  
  
  { "name": "Styloid process", "type": "Bone", "area": "Skull" },
  { "name": "Mandible", "type": "Bone", "area": "Face" },
  { "name": "Angle of mandible", "type": "Bone", "area": "Face" },
  { "name": "Ramus of mandible", "type": "Bone", "area": "Face" },
  { "name": "Head of mandible (condyle)", "type": "Bone", "area": "Face" },
  { "name": "Coronoid process", "type": "Bone", "area": "Face" },
  { "name": "Zygomatic arch", "type": "Bone", "area": "Face" },
  { "name": "Hyoid bone", "type": "Bone", "area": "Neck" },
  { "name": "Thyroid cartilage", "type": "Bone", "area": "Neck" },
  { "name": "Cricoid cartilage", "type": "Bone", "area": "Neck" },
  { "name": "Trachea", "type": "Bone", "area": "Neck" },
  { "name": "External occipital protuberance", "type": "Bone", "area": "Skull" },
  { "name": "Nuchal ligament", "type": "Ligament", "area": "Neck" },

  { "name": "ASIS", "type": "Bone", "area": "Pelvis" },
  { "name": "PSIS", "type": "Bone", "area": "Pelvis" },
  { "name": "Iliac crest", "type": "Bone", "area": "Pelvis" },
  { "name": "Sacrum (S2 region, base, sulcus, ILA)", "type": "Bone", "area": "Pelvis" },
  { "name": "Coccyx", "type": "Bone", "area": "Pelvis" },
  { "name": "Pubic crest", "type": "Bone", "area": "Pelvis" },
  { "name": "Pubic symphysis", "type": "Joint", "area": "Pelvis" },
  { "name": "Pubic tubercle", "type": "Bone", "area": "Pelvis" },
  { "name": "Inguinal ligament", "type": "Ligament", "area": "Pelvis" },
  { "name": "Greater trochanter", "type": "Bone", "area": "Thigh" },
  { "name": "Ischial tuberosity", "type": "Bone", "area": "Pelvis" },
  { "name": "Sacrotuberous ligament", "type": "Ligament", "area": "Pelvis" },

  { "name": "Clavicle", "type": "Bone", "area": "Shoulder girdle" },
  { "name": "Acromion", "type": "Bone", "area": "Shoulder" },
  { "name": "Spine of scapula", "type": "Bone", "area": "Shoulder" },
  { "name": "Superior angle of scapula", "type": "Bone", "area": "Shoulder" },
  { "name": "Medial border of scapula", "type": "Bone", "area": "Shoulder" },
  { "name": "Inferior angle of scapula", "type": "Bone", "area": "Shoulder" },
  { "name": "Coracoid process", "type": "Bone", "area": "Shoulder" },
  { "name": "Greater tuberosity", "type": "Bone", "area": "Shoulder" },
  { "name": "Lesser tuberosity", "type": "Bone", "area": "Shoulder" },
  { "name": "Bicipital groove", "type": "Bone", "area": "Shoulder" },

  { "name": "Talus (head, neck, medial tubercle)", "type": "Bone", "area": "Ankle" },
  { "name": "Navicular", "type": "Bone", "area": "Foot" },
  { "name": "Calcaneal tuberosity", "type": "Bone", "area": "Foot" },
  { "name": "Sustentaculum tali", "type": "Bone", "area": "Foot" },
  { "name": "Peroneal tubercle", "type": "Bone", "area": "Foot" },
  { "name": "Cuboid", "type": "Bone", "area": "Foot" },
  { "name": "Medial Cuneiform", "type": "Bone", "area": "Foot" },
  { "name": "Intermediate Cuneiform", "type": "Bone", "area": "Foot" },
  { "name": "Lateral  Cuneiform", "type": "Bone", "area": "Foot" },
  { "name": "Head of 2nd Metatarsal", "type": "Bone", "area": "Foot" },
  { "name": "Styloid processs of 5nd Metatarsal ", "type": "Bone", "area": "Foot" },
  { "name": "Sesamoid bones (1st MTP)", "type": "Bone", "area": "Foot" },

  { "name": "Scaphoid", "type": "Bone", "area": "Wrist" },
  { "name": "Lunate", "type": "Bone", "area": "Wrist" },
  { "name": "Triquetrum", "type": "Bone", "area": "Wrist" },
  { "name": "Pisiform", "type": "Bone", "area": "Wrist" },
  { "name": "Hamate (hook)", "type": "Bone", "area": "Wrist" },
  { "name": "Capitate", "type": "Bone", "area": "Wrist" },
  { "name": "Trapezium (tubercle)", "type": "Bone", "area": "Wrist" },
  { "name": "Trapezoid", "type": "Bone", "area": "Wrist" },
  { "name": "Lister's tubercle", "type": "Bone", "area": "Forearm" },

  { "name": "SCM", "type": "Muscle", "area": "Neck" },
  { "name": "Trapezius (upper, middle, lower)", "type": "Muscle", "area": "Neck" },
  { "name": "Temporalis", "type": "Muscle", "area": "Head" },
  { "name": "Masseter", "type": "Muscle", "area": "Face" },
  { "name": "Levator scapulae", "type": "Muscle", "area": "Neck" },
  { "name": "Splenius capitis", "type": "Muscle", "area": "Neck" },
  { "name": "Splenius cervicis", "type": "Muscle", "area": "Neck" },
  { "name": "Scalenes (anterior, middle, posterior)", "type": "Muscle", "area": "Neck" },
  
  { "name": "Spinalis", "type": "Muscle", "area": "Back" },
  { "name": "Longissimus", "type": "Muscle", "area": "Back" },
  { "name": "Iliocostalis", "type": "Muscle", "area": "Back" },
  { "name": "Latissimus dorsi", "type": "Muscle", "area": "Back" },
  { "name": "Rhomboid major", "type": "Muscle", "area": "Back" },
  { "name": "Rhomboid minor", "type": "Muscle", "area": "Back" },

  { "name": "Gluteus maximus", "type": "Muscle", "area": "Thigh" },
  { "name": "Gluteus medius", "type": "Muscle", "area": "Thigh" },
  { "name": "Tensor fascia latae (TFL)", "type": "Muscle", "area": "Thigh" },
  { "name": "Iliotibial band (ITB)", "type": "Tendon", "area": "Thigh" },
  { "name": "Piriformis", "type": "Muscle", "area": "Thigh" },
  { "name": "Quadratus femoris", "type": "Muscle", "area": "Thigh" },

  { "name": "Iliopsoas", "type": "Muscle", "area": "Thigh" },
  { "name": "Sartorius", "type": "Muscle", "area": "Thigh" },
  { "name": "Rectus femoris", "type": "Muscle", "area": "Thigh" },
  { "name": "Vastus medialis", "type": "Muscle", "area": "Thigh" },
  { "name": "Vastus lateralis", "type": "Muscle", "area": "Thigh" },
  { "name": "Pectineus", "type": "Muscle", "area": "Thigh" },
  { "name": "Adductor longus", "type": "Muscle", "area": "Thigh" },
  { "name": "Adductor magnus", "type": "Muscle", "area": "Thigh" },
  { "name": "Gracilis", "type": "Muscle", "area": "Thigh" },
  { "name": "Semitendinosus", "type": "Muscle", "area": "Thigh" },
  { "name": "Semimembranosus", "type": "Muscle", "area": "Thigh" },
  { "name": "Biceps femoris", "type": "Muscle", "area": "Thigh" },

  { "name": "Gastrocnemius", "type": "Muscle", "area": "Calf" },
  { "name": "Soleus", "type": "Muscle", "area": "Calf" },
  { "name": "Plantaris", "type": "Muscle", "area": "Calf" },
  { "name": "Popliteus", "type": "Muscle", "area": "Leg" },
  { "name": "Tibialis posterior", "type": "Muscle", "area": "Leg" },
  { "name": "Flexor digitorum longus", "type": "Muscle", "area": "Leg" },
  { "name": "Flexor hallucis longus", "type": "Muscle", "area": "Leg" },
  { "name": "Tibialis anterior", "type": "Muscle", "area": "Leg" },
  { "name": "Extensor hallucis longus", "type": "Muscle", "area": "Leg" },
  { "name": "Extensor digitorum longus", "type": "Muscle", "area": "Leg" },
  { "name": "Peroneus (fibularis) longus", "type": "Muscle", "area": "Leg" },
  { "name": "Peroneus (fibularis) brevis", "type": "Muscle", "area": "Leg" },
  { "name": "Extensor digitorum brevis", "type": "Muscle", "area": "Foot" },
  { "name": "Extensor hallucis brevis", "type": "Muscle", "area": "Foot" },
  { "name": "Plantar fascia (aponeurosis)", "type": "Ligament", "area": "Foot" },

  { "name": "Anterior Deltoid", "type": "Muscle", "area": "Shoulder" },
  { "name": "Middle Deltoid", "type": "Muscle", "area": "Shoulder" },
  { "name": "Posterior Deltoid", "type": "Muscle", "area": "Shoulder" },
  { "name": "Pectoralis major (clavicular, sternal, costal)", "type": "Muscle", "area": "Shoulder" },
  { "name": "Pectoralis minor", "type": "Muscle", "area": "Chest" },
  { "name": "Teres major", "type": "Muscle", "area": "Shoulder" },
  { "name": "Serratus anterior", "type": "Muscle", "area": "Shoulder" },
  { "name": "Supraspinatus", "type": "Muscle", "area": "Shoulder" },
  { "name": "Infraspinatus", "type": "Muscle", "area": "Shoulder" },
  { "name": "Teres minor", "type": "Muscle", "area": "Shoulder" },
  { "name": "Subscapularis", "type": "Muscle", "area": "Shoulder" },

  { "name": "Biceps brachii (short and long heads)", "type": "Muscle", "area": "Arm" },
  { "name": "Brachialis", "type": "Muscle", "area": "Arm" },
  { "name": "Coracobrachialis", "type": "Muscle", "area": "Arm" },
  { "name": "Triceps brachii (long, lateral, medial heads)", "type": "Muscle", "area": "Arm" },
  { "name": "Anconeus", "type": "Muscle", "area": "Arm" },

  { "name": "Pronator teres", "type": "Muscle", "area": "Forearm" },
  { "name": "Flexor carpi radialis", "type": "Muscle", "area": "Forearm" },
  { "name": "Palmaris longus", "type": "Muscle", "area": "Forearm" },
  { "name": "Flexor carpi ulnaris", "type": "Muscle", "area": "Forearm" },
  { "name": "Flexor digitorum superficialis", "type": "Muscle", "area": "Forearm" },
  { "name": "Flexor pollicis longus", "type": "Muscle", "area": "Forearm" },
  { "name": "Flexor digitorum profundus", "type": "Muscle", "area": "Forearm" },
  { "name": "Pronator quadratus", "type": "Muscle", "area": "Forearm" },
  { "name": "Brachioradialis", "type": "Muscle", "area": "Forearm" },
  { "name": "Extensor carpi radialis longus", "type": "Muscle", "area": "Forearm" },
  { "name": "Extensor carpi radialis brevis", "type": "Muscle", "area": "Forearm" },
  { "name": "Extensor digitorum", "type": "Muscle", "area": "Forearm" },
  { "name": "Extensor digiti minimi", "type": "Muscle", "area": "Forearm" },
  { "name": "Extensor carpi ulnaris", "type": "Muscle", "area": "Forearm" },
  { "name": "Supinator", "type": "Muscle", "area": "Forearm" },
  { "name": "Abductor pollicis longus", "type": "Muscle", "area": "Hand" },
  { "name": "Extensor pollicis longus", "type": "Muscle", "area": "Hand" },
  { "name": "Extensor pollicis brevis", "type": "Muscle", "area": "Hand" },
  { "name": "Extensor indicis", "type": "Muscle", "area": "Hand" },

  { "name": "Abductor pollicis brevis", "type": "Muscle", "area": "Hand" },
  { "name": "Flexor pollicis brevis", "type": "Muscle", "area": "Hand" },
  { "name": "Opponens pollicis", "type": "Muscle", "area": "Hand" },
  { "name": "Adductor pollicis (oblique and transverse heads)", "type": "Muscle", "area": "Hand" },
  { "name": "Abductor digiti minimi", "type": "Muscle", "area": "Hand" },
  { "name": "Flexor digiti minimi brevis", "type": "Muscle", "area": "Hand" },
  { "name": "Opponens digiti minimi", "type": "Muscle", "area": "Hand" },
  { "name": "Palmaris brevis", "type": "Muscle", "area": "Hand" },
  { "name": "Hand Lumbricals (1-4)", "type": "Muscle", "area": "Hand" },
  { "name": "Hand Dorsal interossei (1-4)", "type": "Muscle", "area": "Hand" },
  

  { "name": "Femoral artery", "type": "Blood Vessel", "area": "Thigh" },
  { "name": "Superficial temporal artery", "type": "Blood Vessel", "area": "Head" },
  { "name": "Facial artery", "type": "Blood Vessel", "area": "Face" },
  { "name": "Maxillary artery", "type": "Blood Vessel", "area": "Face" },
  { "name": "External carotid artery", "type": "Blood Vessel", "area": "Neck" },
  { "name": "Common carotid artery (carotid pulse)", "type": "Blood Vessel", "area": "Neck" },
  { "name": "Subclavian artery", "type": "Blood Vessel", "area": "Root of neck" },
  { "name": "Popliteal artery", "type": "Blood Vessel", "area": "Knee" },
  { "name": "Posterior tibial artery", "type": "Blood Vessel", "area": "Ankle" },
  { "name": "Anterior tibial artery", "type": "Blood Vessel", "area": "Leg" },
  { "name": "Dorsalis pedis artery", "type": "Blood Vessel", "area": "Foot" },
  { "name": "Radial artery", "type": "Blood Vessel", "area": "Wrist" },
  

  { "name": "Median nerve", "type": "Nerve", "area": "Forearm/Hand" },
  { "name": "Ulnar nerve", "type": "Nerve", "area": "Forearm/Hand" },
  { "name": "Radial nerve", "type": "Nerve", "area": "Arm/Forearm" },
  { "name": "Musculocutaneous nerve", "type": "Nerve", "area": "Arm" },
  
  { "name": "Brachial plexus", "type": "Nerve", "area": "Neck/Axilla" },
  { "name": "Femoral nerve", "type": "Nerve", "area": "Thigh" },
  
  { "name": "Sciatic nerve", "type": "Nerve", "area": "Posterior thigh" },
  { "name": "Tibial nerve", "type": "Nerve", "area": "Posterior leg/Medial ankle" },
  { "name": "Common fibular (peroneal) nerve", "type": "Nerve", "area": "Leg" },
  
  { "name": "Supraorbital nerve", "type": "Nerve", "area": "Face" },
  { "name": "Infraorbital nerve", "type": "Nerve", "area": "Face" },
  { "name": "Mental nerve", "type": "Nerve", "area": "Face" },
  

  { "name": "Patellar tendon (ligament)", "type": "Tendon", "area": "Knee" },
  { "name": "Achilles tendon (calcaneal tendon)", "type": "Tendon", "area": "Ankle" },
  { "name": "Plantaris tendon", "type": "Tendon", "area": "Posterior knee" },
  { "name": "Flexor digitorum longus tendon", "type": "Tendon", "area": "Ankle" },
  { "name": "Flexor hallucis longus tendon", "type": "Tendon", "area": "Ankle" },
  { "name": "Tibialis posterior tendon", "type": "Tendon", "area": "Ankle" },
  { "name": "Extensor tendons (ECRL/ECRB/ED/EDM/EPL/APL/EPB/EI)", "type": "Tendon", "area": "Wrist" },
  { "name": "Flexor tendons (FCR/FCU/FDS/FDP/FPL/PL)", "type": "Tendon", "area": "Wrist" },

  { "name": "MCL (tibial collateral ligament)", "type": "Ligament", "area": "Knee" },
  { "name": "LCL (fibular collateral ligament)", "type": "Ligament", "area": "Knee" },
  { "name": "ATFL (anterior talofibular ligament)", "type": "Ligament", "area": "Ankle" },

  { "name": "PTFL (posterior talofibular ligament)", "type": "Ligament", "area": "Ankle" },
  { "name": "Anterior inferior tibiofibular ligament", "type": "Ligament", "area": "Ankle" },
  { "name": "Deltoid ligament (posterior tibiotalar, tibiocalcaneal, tibionavicular)", "type": "Ligament", "area": "Ankle" },
  { "name": "Plantar calcaneonavicular (spring) ligament", "type": "Ligament", "area": "Foot" },

  { "name": "SC joint (sternoclavicular)", "type": "Joint", "area": "Shoulder" },
  { "name": "AC joint (acromioclavicular)", "type": "Joint", "area": "Shoulder" },
  { "name": "Glenohumeral joint", "type": "Joint", "area": "Shoulder" },
  { "name": "Talocrural joint", "type": "Joint", "area": "Ankle" },
  { "name": "Talo-navicular joint", "type": "Joint", "area": "Foot" },
  { "name": "Calcaneo-cuboid joint", "type": "Joint", "area": "Foot" },
  { "name": "TMJ (temporomandibular joint)", "type": "Joint", "area": "Face" },
  { "name": "Radiohumeral joint", "type": "Joint", "area": "Elbow" },
  { "name": "Humeroulnar joint", "type": "Joint", "area": "Elbow" },
  { "name": "1st MTP joint", "type": "Joint", "area": "Foot" },
  { "name": "MCP joints", "type": "Joint", "area": "Hand" },
  { "name": "PIP joints", "type": "Joint", "area": "Hand" },
  { "name": "DIP joints", "type": "Joint", "area": "Hand" }
]

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
    <div style={{ padding: '20px', margin: '20px', lineHeight: '1.6' }}>
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
        <h2 className="text-lg font-semibold mb-1">Number of Items</h2>
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
            
            {item.type === "Muscle" ? (
              
      <p><strong>{idx + 1 + "."} {idx % 2 === 0 ? "Origin of " : "Insertion of "} {item.name}  </strong></p>
    ) : (
      <p><strong>{idx + 1 + "."} {item.name}</strong></p>
    )}

            {/* <p className="text-sm text-gray-600">Type: {item.type}</p> */}
            
          </div>
        ))}
      </div>
    </div>
  );
}
