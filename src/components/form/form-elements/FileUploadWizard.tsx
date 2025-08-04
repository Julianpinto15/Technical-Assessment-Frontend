import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Form from "../../form/Form";
import Alert from "../../ui/alert/Alert";
import ComponentCard from "../../common/ComponentCard";
import axios from "axios";

// Tipado para fila de datos validados
interface PreviewRow {
  [key: string]: string | number | boolean;
}

// Respuesta del endpoint /upload/preview
interface PreviewResponse {
  data: PreviewRow[];
  suggestedMapping: Record<string, string>;
  errors: string[];
}

const FileUploadWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<PreviewRow[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>(
    {}
  );
  const [progress, setProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.post<PreviewResponse>(
        "http://localhost:3000/api/files/upload/preview",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (event) => {
            const percentCompleted = Math.round(
              (event.loaded * 100) / (event.total || 1)
            );
            setProgress(percentCompleted);
          },
        }
      );

      setPreviewData(response.data.data.slice(0, 5));
      setColumnMapping(response.data.suggestedMapping);
      setValidationErrors(response.data.errors || []);

      if (response.data.errors.length === 0) {
        setStep(2);
      }
    } catch {
      setValidationErrors(["Error al procesar el archivo"]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
  });

  const handleMappingChange = (col: string, value: string) => {
    setColumnMapping((prev) => ({
      ...prev,
      [col]: value,
    }));
  };

  const handleMappingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:3000/api/files/upload/map",
        {
          fileName: file?.name,
          mapping: columnMapping,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setValidationErrors(response.data.errors || []);
      if (response.data.errors?.length === 0) {
        setStep(3);
      }
    } catch {
      setValidationErrors([
        "Error al validar el mapeo de columnas. Por favor, revisa los datos.",
      ]);
    }
  };

  const handleConfirm = async () => {
    if (!file) return;

    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("file", file); // obligatorio para req.file
    formData.append("fileName", file.name);
    formData.append("mapping", JSON.stringify(columnMapping)); // en backend lo puedes parsear

    try {
      const response = await axios.post(
        "http://localhost:3000/api/files/upload/confirm",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadResult(response.data.message);
      setProgress(100);
    } catch {
      setValidationErrors(["Error al confirmar la carga"]);
    }
  };

  return (
    <ComponentCard title="Carga de Datos">
      <Form onSubmit={handleMappingSubmit}>
        {step === 1 && (
          <div
            {...getRootProps()}
            className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10 ${
              isDragActive
                ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
            }`}
          >
            <input {...getInputProps()} />
            <div className="dz-message flex flex-col items-center">
              <div className="mb-[22px] flex justify-center">
                <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  <svg
                    className="fill-current"
                    width="29"
                    height="28"
                    viewBox="0 0 29 28"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.5 3.917c-.217 0-.412.092-.549.239l-5.38 5.376a.667.667 0 0 0 .948.948l4.118-4.115v12.19c0 .414.336.75.75.75s.75-.336.75-.75V6.482l4.114 4.111a.667.667 0 1 0 .948-.948l-5.342-5.338a.667.667 0 0 0-.507-.226Zm-8.585 14.75a.75.75 0 0 0-.75.75v3.167c0 1.243 1.007 2.25 2.25 2.25h15.667c1.243 0 2.25-1.007 2.25-2.25v-3.167a.75.75 0 0 0-1.5 0v3.167a.75.75 0 0 1-.75.75H7.416a.75.75 0 0 1-.75-.75v-3.167a.75.75 0 0 0-.75-.75Z"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
                {isDragActive
                  ? "Suelta el archivo aquí"
                  : "Arrastra y suelta tu archivo aquí"}
              </h4>
              <span className="text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
                Arrastra y suelta tu archivo CSV o Excel aquí o haz clic para
                seleccionar
              </span>
              <span className="font-medium underline text-theme-sm text-brand-500">
                Seleccionar archivo
              </span>
            </div>
            {progress > 0 && progress < 100 && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-brand-500 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-400">
                  Progreso: {progress}%
                </span>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <h4 className="mb-4 text-lg font-semibold">Mapeo de Columnas</h4>
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr>
                  {Object.keys(previewData[0] || {}).map((col) => (
                    <th key={col} className="py-2 px-4 border-b">
                      <select
                        value={columnMapping[col] || ""}
                        onChange={(e) =>
                          handleMappingChange(col, e.target.value)
                        }
                        className="border rounded p-1"
                      >
                        <option value="">Seleccionar</option>
                        {[
                          "sku",
                          "fecha",
                          "cantidad",
                          "precio",
                          "promocion",
                          "categoria",
                        ].map((field) => (
                          <option key={field} value={field}>
                            {field}
                          </option>
                        ))}
                      </select>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, index) => (
                  <tr key={index} className="border-b">
                    {Object.values(row).map((value, i) => (
                      <td key={i} className="py-2 px-4">
                        {String(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="submit"
              className="mt-4 bg-brand-500 text-white px-4 py-2 rounded"
            >
              Validar Mapeo
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h4 className="mb-4 text-lg font-semibold">Confirmar Carga</h4>
            <p>Revisa los datos antes de confirmar:</p>
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr>
                  {Object.values(columnMapping).map((col) => (
                    <th key={col} className="py-2 px-4 border-b">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, index) => (
                  <tr key={index} className="border-b">
                    {Object.keys(columnMapping).map((key) => (
                      <td key={key} className="py-2 px-4">
                        {String(row[key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleConfirm}
              className="mt-4 bg-brand-500 text-white px-4 py-2 rounded"
            >
              Confirmar
            </button>
          </div>
        )}

        {validationErrors.length > 0 && (
          <div className="mt-4">
            {validationErrors.map((error, index) => (
              <Alert
                key={index}
                variant="error"
                title="Error en la carga"
                message={error}
              />
            ))}
          </div>
        )}

        {uploadResult && (
          <Alert
            variant="success"
            title="Carga Exitosa"
            message={uploadResult}
            showLink
            linkHref="/notifications"
            linkText="Ver detalles en notificaciones"
          />
        )}
      </Form>
    </ComponentCard>
  );
};

export default FileUploadWizard;
