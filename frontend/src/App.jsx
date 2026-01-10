import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Heart, User, Users, Brain, Wallet, Sparkles, MapPin, HeartHandshake, CalendarDays, Clock } from 'lucide-react'
import './App.css'

function App() {
  // 公式名称リスト
  const loveTypes = [
    { value: "LCRO", label: "LCRO (ボス猫)" },
    { value: "LCRE", label: "LCRE (隠れベイビー)" },
    { value: "LCPO", label: "LCPO (主役体質)" },
    { value: "LCPE", label: "LCPE (ツンデレヤンキー)" },
    { value: "LARO", label: "LARO (憧れの先輩)" },
    { value: "LARE", label: "LARE (カリスマバランサー)" },
    { value: "LAPO", label: "LAPO (パーフェクトカメレオン)" },
    { value: "LAPE", label: "LAPE (キャプテンライオン)" },
    { value: "FCRO", label: "FCRO (ロマンスマジシャン)" },
    { value: "FCRE", label: "FCRE (ちゃっかりうさぎ)" },
    { value: "FCPO", label: "FCPO (恋愛モンスター)" },
    { value: "FCPE", label: "FCPE (忠犬ハチ公)" },
    { value: "FARO", label: "FARO (不思議生命体)" },
    { value: "FARE", label: "FARE (敏腕マネージャー)" },
    { value: "FAPO", label: "FAPO (デビル天使)" },
    { value: "FAPE", label: "FAPE (最後の恋人)" },
  ];

  // ★「自分」の項目を削除しました
  const [formData, setFormData] = useState({
    relationship: '',
    age_group: '',
    gender: '男性',
    mbti: 'INTJ',
    love_type: 'LCRO', // 相手のみ
    start_time: '11:00',
    budget: '',
    location: ''
  })
  
  const [plan, setPlan] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('https://deto-plan-app.onrender.com/api/generate_plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (data.status === "error") {
        alert("AIエラー: " + data.message)
      } else {
        setPlan(data.plan)
      }

    } catch (error) {
      console.error('エラー:', error)
      alert("通信エラーが発生しました")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>
        <Heart fill="#ff477e" style={{ marginRight: '10px', verticalAlign: 'middle' }} />
        AIデートプランナー
      </h1>
      <p>React + FastAPI で開発中</p>

      <div className="card">
        <form onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label>
              <CalendarDays size={18} /> 相手の年代
            </label>
            <input 
              type="text" 
              name="age_group" 
              value={formData.age_group} 
              onChange={handleChange}
              placeholder="例: 20代前半、高校生、40代"
              required 
            />
          </div>

          <div className="input-group">
            <label>
              <HeartHandshake size={18} /> 二人の関係性
            </label>
            <input 
              type="text" 
              name="relationship" 
              value={formData.relationship} 
              onChange={handleChange}
              placeholder="例: 初デート、付き合って3年、夫婦"
              required 
            />
          </div>

          <div className="input-group">
            <label>
              <Users size={18} /> 性別
            </label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="男性">男性</option>
              <option value="女性">女性</option>
              <option value="その他">その他</option>
            </select>
          </div>

          <div className="input-group">
            <label>
              <Brain size={18} /> 相手のMBTI
            </label>
            <select name="mbti" value={formData.mbti} onChange={handleChange}>
              <option value="INTJ">INTJ (建築家)</option>
              <option value="INTP">INTP (論理学者)</option>
              <option value="ENTJ">ENTJ (指揮官)</option>
              <option value="ENTP">ENTP (討論者)</option>
              <option value="INFJ">INFJ (提唱者)</option>
              <option value="INFP">INFP (仲介者)</option>
              <option value="ENFJ">ENFJ (主人公)</option>
              <option value="ENFP">ENFP (広報運動家)</option>
              <option value="ISTJ">ISTJ (管理者)</option>
              <option value="ISFJ">ISFJ (擁護者)</option>
              <option value="ESTJ">ESTJ (幹部)</option>
              <option value="ESFJ">ESFJ (領事官)</option>
              <option value="ISTP">ISTP (巨匠)</option>
              <option value="ISFP">ISFP (冒険家)</option>
              <option value="ESTP">ESTP (起業家)</option>
              <option value="ESFP">ESFP (エンターテイナー)</option>
            </select>
          </div>

          {/* ★自分のLove Type入力欄を削除しました */}
          <div className="input-group">
            <label>
              <Heart size={18} /> 相手のLove Type
            </label>
            <select name="love_type" value={formData.love_type} onChange={handleChange}>
              {loveTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>
              <Clock size={18} /> 開始時間
            </label>
            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              required
            />  
          </div>

          <div className="input-group">
            <label>
              <MapPin size={18} /> デートの場所
            </label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange}
              placeholder="例: 横浜、梅田、ディズニーランド"
              required 
            />
          </div>

          <div className="input-group">
            <label>
              <Wallet size={18} /> 予算
            </label>
            <input 
              type="text" 
              name="budget" 
              value={formData.budget} 
              onChange={handleChange}
              placeholder="例: 3,000円以内、上限なし"
              required 
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="spinner"></span>
                AIが考え中...
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Sparkles size={20} />
                デートプランを作成！
              </div>
            )}
          </button>
        </form>
      </div>

      {plan && (
        <div className="result-area">
          <h2>
             <Heart size={20} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />
             提案されたプラン
          </h2>
          <div className="plan-text">
            <ReactMarkdown>{plan}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}

export default App