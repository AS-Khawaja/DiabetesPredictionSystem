import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface FormData {
  Pregnancies: string;
  Glucose: string;
  BloodPressure: string;
  SkinThickness: string;
  Insulin: string;
  BMI: string;
  DiabetesPedigreeFunction: string;
  Age: string;
}

interface PredictionFormProps {
  onPredict: (prediction: { result: boolean; probability: number }) => void;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onPredict }) => {
  const [formData, setFormData] = useState<FormData>({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name as keyof FormData]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key as keyof FormData] = 'This field is required';
        isValid = false;
      } else if (isNaN(Number(value))) {
        newErrors[key as keyof FormData] = 'Must be a number';
        isValid = false;
      }
    });

    if (Number(formData.Pregnancies) < 0) {
      newErrors.Pregnancies = 'Cannot be negative';
      isValid = false;
    }

    if (Number(formData.Glucose) < 0 || Number(formData.Glucose) > 300) {
      newErrors.Glucose = 'Must be between 0 and 300';
      isValid = false;
    }

    if (Number(formData.BloodPressure) < 0 || Number(formData.BloodPressure) > 200) {
      newErrors.BloodPressure = 'Must be between 0 and 200';
      isValid = false;
    }

    if (Number(formData.BMI) < 10 || Number(formData.BMI) > 50) {
      newErrors.BMI = 'Must be between 10 and 50';
      isValid = false;
    }

    if (Number(formData.Age) < 0 || Number(formData.Age) > 120) {
      newErrors.Age = 'Must be between 0 and 120';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      toast.info("Analyzing your data...");

      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setTimeout(async () => {
        const result = await response.json();
        console.log("Response:", result);

        onPredict({
          result: result.Diabetes === 1,
          probability: result.Probability,
        });
        toast.success("Analysis complete!");
      }, 1500);
    } else {
      toast.error("Please fix the errors in the form");
    }
  };

  const handleReset = () => {
    setFormData({
      Pregnancies: '',
      Glucose: '',
      BloodPressure: '',
      SkinThickness: '',
      Insulin: '',
      BMI: '',
      DiabetesPedigreeFunction: '',
      Age: ''
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Field: Pregnancies */}
        <div className="form-group">
          <Label htmlFor="Pregnancies">Pregnancies</Label>
          <Input
            id="Pregnancies"
            name="Pregnancies"
            value={formData.Pregnancies}
            onChange={handleChange}
            placeholder="0"
            className={`input-field ${errors.Pregnancies ? 'border-red-500' : ''}`}
          />
          {errors.Pregnancies && <p className="text-red-500 text-sm mt-1">{errors.Pregnancies}</p>}
        </div>

        {/* Field: Glucose */}
        <div className="form-group">
          <Label htmlFor="Glucose">Glucose (mg/dL)</Label>
          <Input
            id="Glucose"
            name="Glucose"
            value={formData.Glucose}
            onChange={handleChange}
            placeholder="95"
            className={`input-field ${errors.Glucose ? 'border-red-500' : ''}`}
          />
          {errors.Glucose && <p className="text-red-500 text-sm mt-1">{errors.Glucose}</p>}
        </div>

        {/* Field: BloodPressure */}
        <div className="form-group">
          <Label htmlFor="BloodPressure">Blood Pressure (mm Hg)</Label>
          <Input
            id="BloodPressure"
            name="BloodPressure"
            value={formData.BloodPressure}
            onChange={handleChange}
            placeholder="80"
            className={`input-field ${errors.BloodPressure ? 'border-red-500' : ''}`}
          />
          {errors.BloodPressure && <p className="text-red-500 text-sm mt-1">{errors.BloodPressure}</p>}
        </div>

        {/* Field: SkinThickness */}
        <div className="form-group">
          <Label htmlFor="SkinThickness">Skin Thickness (mm)</Label>
          <Input
            id="SkinThickness"
            name="SkinThickness"
            value={formData.SkinThickness}
            onChange={handleChange}
            placeholder="30"
            className={`input-field ${errors.SkinThickness ? 'border-red-500' : ''}`}
          />
          {errors.SkinThickness && <p className="text-red-500 text-sm mt-1">{errors.SkinThickness}</p>}
        </div>

        {/* Field: Insulin */}
        <div className="form-group">
          <Label htmlFor="Insulin">Insulin (µU/ml)</Label>
          <Input
            id="Insulin"
            name="Insulin"
            value={formData.Insulin}
            onChange={handleChange}
            placeholder="150"
            className={`input-field ${errors.Insulin ? 'border-red-500' : ''}`}
          />
          {errors.Insulin && <p className="text-red-500 text-sm mt-1">{errors.Insulin}</p>}
        </div>

        {/* Field: BMI */}
        <div className="form-group">
          <Label htmlFor="BMI">BMI</Label>
          <Input
            id="BMI"
            name="BMI"
            value={formData.BMI}
            onChange={handleChange}
            placeholder="25"
            className={`input-field ${errors.BMI ? 'border-red-500' : ''}`}
          />
          {errors.BMI && <p className="text-red-500 text-sm mt-1">{errors.BMI}</p>}
        </div>

        {/* Field: DiabetesPedigreeFunction */}
        <div className="form-group">
          <Label htmlFor="DiabetesPedigreeFunction">Diabetes Pedigree Function</Label>
          <Input
            id="DiabetesPedigreeFunction"
            name="DiabetesPedigreeFunction"
            value={formData.DiabetesPedigreeFunction}
            onChange={handleChange}
            placeholder="0.6"
            className={`input-field ${errors.DiabetesPedigreeFunction ? 'border-red-500' : ''}`}
          />
          {errors.DiabetesPedigreeFunction && <p className="text-red-500 text-sm mt-1">{errors.DiabetesPedigreeFunction}</p>}
        </div>

        {/* Field: Age */}
        <div className="form-group">
          <Label htmlFor="Age">Age (years)</Label>
          <Input
            id="Age"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            placeholder="35"
            className={`input-field ${errors.Age ? 'border-red-500' : ''}`}
          />
          {errors.Age && <p className="text-red-500 text-sm mt-1">{errors.Age}</p>}
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <Button type="submit" className="btn-primary flex-1">Predict Risk</Button>
        <Button type="button" variant="outline" onClick={handleReset} className="btn-secondary flex-1">Reset Form</Button>
      </div>
    </form>
  );
};

export default PredictionForm;
